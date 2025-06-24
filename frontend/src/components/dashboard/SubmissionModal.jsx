import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';

const SubmissionModal = ({ submission, onClose }) => {
  if (!submission) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(submission.code);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-900 text-green-300 border-green-700';
      case 'Medium':
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'Hard':
        return 'bg-red-900 text-red-300 border-red-700';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  return (
    <Dialog open={!!submission} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto bg-dark-card border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">
              {submission.problemTitle}
            </DialogTitle>
            <Badge className={`${getDifficultyColor(submission.difficulty)} border`}>
              {submission.difficulty}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Submission Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <div className="text-sm text-gray-400">Language</div>
              <div className="font-medium text-white">{submission.language}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Runtime</div>
              <div className="font-medium text-white">{submission.runtime}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Memory</div>
              <div className="font-medium text-white">{submission.memory}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Status</div>
              <div className="font-medium text-green-400">✓ Accepted</div>
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Submitted Code</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="border-gray-600 text-black hover:bg-gray-700 hover:text-white"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  <span>Copy</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-black hover:bg-gray-700 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span>View Problem</span>
                  
                </Button>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-700">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {submission.code}
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
