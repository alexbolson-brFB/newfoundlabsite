import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (url === '/api/contact') {
          try {
            const { default: handler } = await import('./api/contact.ts');
            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              try {
                let parsedBody: unknown = undefined;
                if (bodyStr) {
                  try {
                    parsedBody = JSON.parse(bodyStr);
                  } catch {
                    parsedBody = bodyStr;
                  }
                }
                (req as any).body = parsedBody;
                const vercelRes = Object.assign(res, {
                  status(code: number) {
                    res.statusCode = code;
                    return vercelRes;
                  },
                  json(payload: any) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(payload));
                    return vercelRes;
                  },
                });
                await handler(req as any, vercelRes as any);
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
              }
            });
            return;
          } catch (e) {
            return next(e);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: true,
      },
      plugins: [react(), contactApiPlugin()],
      build: {
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                  return 'vendor-react';
                }
                if (id.includes('framer-motion')) {
                  return 'vendor-framer';
                }
                if (id.includes('lucide-react')) {
                  return 'vendor-icons';
                }
                return 'vendor'; // all other dependencies
              }
            }
          }
        }
      },
      esbuild: mode === 'production' ? {
        drop: ['console', 'debugger'],
      } : undefined,
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
