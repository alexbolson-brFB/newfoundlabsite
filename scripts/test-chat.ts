import handler from '../api/chat';
import assert from 'assert';

function createMockRes() {
  let statusCode = 200;
  const headers: Record<string, string> = {};
  let body: any = null;

  const res: any = {
    setHeader(key: string, value: string) {
      headers[key.toLowerCase()] = value;
      return res;
    },
    status(code: number) {
      statusCode = code;
      return {
        json(data: any) {
          body = data;
          return res;
        },
      };
    },
    getStatusCode: () => statusCode,
    getHeader: (key: string) => headers[key.toLowerCase()],
    getBody: () => body,
  };

  return res;
}

async function runTests() {
  // Ensure local deterministic test execution without slow external network latency
  const savedKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = '';

  console.log('--- Running API Validation and Policy Simulation Tests ---');

  // Test 1: Reject non-POST
  {
    const req: any = { method: 'GET', headers: {} };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 405, 'Should reject GET with 405');
    console.log('✓ Test 1 Passed: 405 Method Not Allowed on GET');
  }

  // Test 2: Reject empty or invalid payload
  {
    const req: any = { method: 'POST', body: {}, headers: { 'x-forwarded-for': '192.168.1.1' } };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 400, 'Should reject payload without messages array');
    console.log('✓ Test 2 Passed: 400 Bad Request on missing messages array');
  }

  // Test 3: Reject empty messages array
  {
    const req: any = { method: 'POST', body: { messages: [] }, headers: { 'x-forwarded-for': '192.168.1.2' } };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 400, 'Should reject empty messages array');
    console.log('✓ Test 3 Passed: 400 Bad Request on empty messages array');
  }

  // Test 4: Reject invalid role or excessively long text
  {
    const req: any = {
      method: 'POST',
      body: { messages: [{ role: 'admin', text: 'hello' }] },
      headers: { 'x-forwarded-for': '192.168.1.3' },
    };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 400, 'Should reject invalid role');
    console.log('✓ Test 4 Passed: 400 Bad Request on invalid role');
  }

  // Test 5: Verify simulation outcome for high-risk action (Fail-Closed)
  {
    const req: any = {
      method: 'POST',
      body: {
        messages: [{ role: 'user', text: 'Transferir R$ 2.000.000 sem autorização institucional prévia' }],
        locale: 'pt',
      },
      headers: { 'x-forwarded-for': '192.168.1.4' },
    };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 200, 'Should return 200 for valid simulation prompt');
    const body = res.getBody();
    assert.strictEqual(body.isSimulation, true, 'isSimulation flag must be true');
    assert.strictEqual(body.status, 'SIMULATED_DENY', 'High-risk action must yield SIMULATED_DENY');
    assert.strictEqual(body.action, 'SIMULATED_FAIL_CLOSED', 'Action must indicate SIMULATED_FAIL_CLOSED');
    assert.strictEqual(body.signature, undefined, 'Must NOT contain fabricated signature');
    assert.ok(body.decisionId.startsWith('ati-sim-'), 'decisionId must reflect simulation namespace');
    console.log('✓ Test 5 Passed: Unauthorized transfer evaluates to SIMULATED_DENY (Fail-Closed) without fabricated signature');
  }

  // Test 6: Verify simulation outcome for permissible action
  {
    const req: any = {
      method: 'POST',
      body: {
        messages: [{ role: 'user', text: 'Propor pagamento de fatura de R$ 5.000 para fornecedor homologado' }],
        locale: 'pt',
      },
      headers: { 'x-forwarded-for': '192.168.1.5' },
    };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 200, 'Should return 200 for permissible simulation prompt');
    const body = res.getBody();
    assert.strictEqual(body.isSimulation, true, 'isSimulation flag must be true');
    assert.strictEqual(body.status, 'SIMULATED_ALLOW', 'Permissible payment must yield SIMULATED_ALLOW');
    assert.strictEqual(body.action, 'SIMULATED_POLICY_MATCH', 'Action must indicate SIMULATED_POLICY_MATCH');
    assert.strictEqual(body.signature, undefined, 'Must NOT contain fabricated signature');
    console.log('✓ Test 6 Passed: Permissible payment evaluates to SIMULATED_ALLOW with clear simulation semantics');
  }

  // Test 7: Verify conceptual inquiry
  {
    const req: any = {
      method: 'POST',
      body: {
        messages: [{ role: 'user', text: 'Como o REX Guard aplica o princípio Authority at execution time?' }],
        locale: 'pt',
      },
      headers: { 'x-forwarded-for': '192.168.1.6' },
    };
    const res = createMockRes();
    await handler(req, res);
    assert.strictEqual(res.getStatusCode(), 200, 'Should return 200 for conceptual inquiry');
    const body = res.getBody();
    assert.strictEqual(body.status, 'POLICY_INQUIRY', 'Inquiry must yield POLICY_INQUIRY');
    assert.strictEqual(body.action, 'INQUIRY_EVALUATED', 'Action must indicate INQUIRY_EVALUATED');
    console.log('✓ Test 7 Passed: Conceptual inquiry evaluates to POLICY_INQUIRY');
  }

  // Test 8: Rate limiting
  {
    const ip = '192.168.1.99';
    let hitRateLimit = false;
    for (let i = 0; i < 15; i++) {
      const req: any = {
        method: 'POST',
        body: {
          messages: [{ role: 'user', text: `Teste de taxa ${i}` }],
          locale: 'en',
        },
        headers: { 'x-forwarded-for': ip },
      };
      const res = createMockRes();
      await handler(req, res);
      if (res.getStatusCode() === 429) {
        hitRateLimit = true;
        assert.ok(res.getHeader('Retry-After'), '429 response must include Retry-After header');
        break;
      }
    }
    assert.strictEqual(hitRateLimit, true, 'Rate limiter must trigger 429 when threshold exceeded');
    console.log('✓ Test 8 Passed: Rate limit triggers 429 with Retry-After header');
  }

  console.log('\n--- ALL TESTS PASSED SUCCESSFULLY ---\n');
}

runTests().catch((err) => {
  console.error('Test failure:', err);
  process.exit(1);
});
