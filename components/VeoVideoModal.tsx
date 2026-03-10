import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Play, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

interface VeoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VeoVideoModal: React.FC<VeoVideoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState(t.video.generating);
  
  // Track mounting state to avoid updates on unmounted component
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Reset state when modal is opened or closed
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow exit animation to finish before resetting state (optional, but cleaner)
      const timer = setTimeout(() => {
        if (!isOpen && isMountedRef.current) { 
          setIsGenerating(false);
          setError(null);
          // We might want to keep the videoUrl so the user doesn't lose it if they accidentally close,
          // but for "generating" state, we should reset.
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const generateVideo = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      // 1. Ensure API Key Selection
      const win = window as any;
      if (win.aistudio) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await win.aistudio.openSelectKey();
        }
      }

      // 2. Initialize Gemini Client with selected key (inside function to get fresh key)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // 3. Start Video Generation
      if (isMountedRef.current) setStatusMessage(t.video.generating);
      
      // FoundLab specific prompt for Veo: Visualizing Zero-Persistence
      const prompt = "Cinematic 3d render of a high-tech digital bank vault. Data appears as streams of golden light entering a glowing translucent cube container suspended in void. The processing happens inside. Then, effectively demonstrating 'Zero-Persistence', the container instantly shatters into fine dust and vanishes completely, leaving absolutely no trace. Green and Navy blue corporate color scheme. High tech, futuristic, highly detailed, photorealistic, 8k, unreal engine 5 style, volumetric lighting.";
      
      // Show prompt to user for transparency (logging to console or could set state to display)
      console.log("Generating with prompt:", prompt);
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // 4. Poll for Completion (Recommended interval: 10s)
      if (isMountedRef.current) setStatusMessage(t.video.waiting);
      while (!operation.done) {
        // Break loop if component unmounted
        if (!isMountedRef.current) return;
        
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      // 5. Fetch and Display Video
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // Must append API key when fetching the video bytes
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await videoResponse.blob();
        if (isMountedRef.current) setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("No video URI returned");
      }

    } catch (e: any) {
      console.error("Video generation failed:", e);
      if (!isMountedRef.current) return;
      
      // If error suggests missing key/auth, reset or prompt. Defensive check for e.message.
      const errorMessage = e?.message || "";
      if (errorMessage.includes("Requested entity was not found") || e?.status === 404) {
         const win = window as any;
         if (win.aistudio) await win.aistudio.openSelectKey();
         setError("Auth Error. Please re-select API Key.");
      } else {
         setError(t.video.error);
      }
    } finally {
      if (isMountedRef.current) setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy-950/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-4xl rounded-sm overflow-hidden shadow-2xl relative border border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-serif text-2xl text-navy-900">{t.video.title}</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content Area */}
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:30px_30px] bg-[position:0_0,15px_15px]"></div>

              {/* State: Initial (No Video) */}
              {!videoUrl && !isGenerating && !error && (
                <div className="text-center p-10 relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                     <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h4 className="text-white font-serif text-xl mb-2">Generate Explainer</h4>
                  <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">Use Google Veo to generate a unique architectural visualization of FoundLab's Zero-Persistence model.</p>
                  
                  <button
                    onClick={generateVideo}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-sm transition-all shadow-lg hover:shadow-gold-500/20"
                  >
                    {t.video.generateBtn}
                  </button>
                </div>
              )}

              {/* State: Loading */}
              {isGenerating && (
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 border-4 border-t-gold-500 border-white/20 rounded-full animate-spin mx-auto mb-6"></div>
                  <div className="text-white font-serif text-lg animate-pulse">{statusMessage}</div>
                  <div className="mt-4 w-64 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto">
                     <motion.div 
                        className="h-full bg-gold-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 15, ease: "linear" }}
                     />
                  </div>
                  {/* Prompt Transparency */}
                  <div className="mt-8 max-w-lg mx-auto bg-black/40 p-4 rounded-sm border border-white/10 text-left">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mb-2">Prompt Sent to Veo:</p>
                      <p className="text-[10px] text-slate-300 font-mono leading-relaxed line-clamp-3 italic opacity-80">
                        "Cinematic 3d render of a high-tech digital bank vault... Zero-Persistence... container instantly shatters..."
                      </p>
                  </div>
                </div>
              )}

              {/* State: Playing */}
              {videoUrl && (
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover relative z-20"
                />
              )}

              {/* State: Error */}
              {error && (
                <div className="text-center relative z-10 text-white">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h4 className="text-xl font-serif mb-2">Generation Error</h4>
                  <p className="text-slate-400 mb-6">{error}</p>
                  <button onClick={generateVideo} className="text-xs uppercase tracking-widest border-b border-gold-500 text-gold-500 pb-1 hover:text-white hover:border-white transition-colors">
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider">
               <span>{t.video.disclaimer}</span>
               {videoUrl && (
                 <a href={videoUrl} download="foundlab-veo-explainer.mp4" className="hover:text-navy-900 font-bold transition-colors">
                   Download MP4
                 </a>
               )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VeoVideoModal;
