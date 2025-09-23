import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/button';
import { iPadCard as IPadCard } from '../ui/ipad-card';

interface VoiceCommand {
  command: string;
  response: string;
  timestamp: Date;
}

interface TroyVoiceAssistantProps {
  onCommand: (command: string) => void;
}

export const TroyVoiceAssistant = ({ onCommand }: TroyVoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const commonCommands = [
    "Turn on living room lights",
    "Set bedroom brightness to 50%",
    "Switch to relax mode",
    "Turn off all lights",
    "Set kitchen to focus mode",
    "Dim dining room lights"
  ];

  const handleVoiceToggle = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      simulateVoiceResponse("Troy AI activated. How can I help with your lighting?");
    } else {
      setIsEnabled(false);
      setIsListening(false);
      setIsSpeaking(false);
    }
  };

  const handleListenToggle = () => {
    if (!isEnabled) return;
    
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate listening
      setTimeout(() => {
        setIsListening(false);
        handleMockCommand("Turn on living room lights");
      }, 3000);
    }
  };

  const handleMockCommand = (command: string) => {
    const response = generateMockResponse(command);
    
    const newCommand: VoiceCommand = {
      command,
      response,
      timestamp: new Date()
    };
    
    setRecentCommands(prev => [newCommand, ...prev.slice(0, 4)]);
    onCommand(command);
    simulateVoiceResponse(response);
  };

  const simulateVoiceResponse = (text: string) => {
    setIsSpeaking(true);
    // Simulate TTS duration based on text length
    const duration = Math.max(2000, text.length * 50);
    setTimeout(() => setIsSpeaking(false), duration);
  };

  const generateMockResponse = (command: string): string => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('turn on')) {
      return "Lights turned on successfully.";
    } else if (lowerCommand.includes('turn off')) {
      return "Lights turned off.";
    } else if (lowerCommand.includes('brightness') || lowerCommand.includes('dim')) {
      return "Brightness adjusted as requested.";
    } else if (lowerCommand.includes('mode') || lowerCommand.includes('scene')) {
      return "Lighting scene changed successfully.";
    } else {
      return "Command processed. Your lighting has been updated.";
    }
  };

  return (
    <IPadCard className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isEnabled ? 'bg-accent text-white' : 'bg-white/10 text-gray-400'
          }`}>
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Troy AI Assistant</h3>
            <p className="text-gray-400 text-xs">
              {isEnabled ? (isListening ? 'Listening...' : 'Ready for commands') : 'Voice control disabled'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={isListening ? "default" : "secondary"}
            size="sm"
            onClick={handleListenToggle}
            disabled={!isEnabled}
            className="flex items-center space-x-1"
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          
          <Button
            variant={isEnabled ? "default" : "secondary"}
            size="sm"
            onClick={handleVoiceToggle}
            className="flex items-center space-x-1"
          >
            {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-xs">{isEnabled ? 'On' : 'Off'}</span>
          </Button>
        </div>
      </div>

      {isEnabled && (
        <>
          {/* Voice Status Indicator */}
          {(isListening || isSpeaking) && (
            <div className="flex items-center justify-center mb-4 p-3 bg-accent/20 rounded-lg">
              <div className="flex items-center space-x-2">
                {isListening && (
                  <>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Listening for your command...</span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-accent rounded-full animate-pulse"></div>
                      <div className="w-1 h-4 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-4 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-white text-sm">Troy is speaking...</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Quick Commands */}
          <div className="mb-4">
            <h4 className="text-white text-xs font-medium mb-2">Quick Commands</h4>
            <div className="grid grid-cols-1 gap-1">
              {commonCommands.slice(0, 3).map((command, index) => (
                <button
                  key={index}
                  onClick={() => handleMockCommand(command)}
                  className="text-left text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded px-2 py-1 transition-colors"
                >
                  "{command}"
                </button>
              ))}
            </div>
          </div>

          {/* Recent Commands */}
          {recentCommands.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white text-xs font-medium">Recent Commands</h4>
              {recentCommands.map((cmd, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-2">
                  <div className="flex items-start space-x-2 mb-1">
                    <Mic className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-white text-xs">"{cmd.command}"</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Volume2 className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-xs">{cmd.response}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    {cmd.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!isEnabled && (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm mb-3">
            Enable Troy AI to control your smart lighting with voice commands.
          </p>
          <div className="text-xs text-gray-500">
            <p>Features coming soon:</p>
            <ul className="mt-1 space-y-1">
              <li>• Real-time voice recognition</li>
              <li>• Natural language processing</li>
              <li>• Custom voice commands</li>
              <li>• Integration with ElevenLabs AI</li>
            </ul>
          </div>
        </div>
      )}
    </IPadCard>
  );
};