import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, Image } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

interface MarkdownEditorProps {
  content: string;
  setContent: (c: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDragOver: boolean;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  content,
  setContent,
  activeTab,
  setActiveTab,
  isDragOver,
  handleDrop,
  handleDragOver,
  handleDragLeave,
}) => (
  <div className="mt-2">
    <div className={`h-[600px] ${isDragOver ? "ring-2 ring-blue-500 bg-blue-50/50" : ""}`}>
      <div className="p-4 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-[calc(100%-80px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="edit" className="h-full p-4 pt-0 mt-0 relative">
            {isDragOver && (
              <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <Image className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-blue-600 font-medium">Drop your image here</p>
                  <p className="text-blue-500 text-sm">It will be automatically uploaded and inserted</p>
                </div>
              </div>
            )}
            <Textarea
              id="content"
              placeholder="Write your article content in markdown...\n\n💡 Tip: You can drag and drop images here or use the upload button above!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className="h-full min-h-[500px] resize-none font-mono text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </TabsContent>
          <TabsContent value="preview" className="h-full p-4 pt-0 mt-0 overflow-auto">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "Nothing to preview yet. Start writing in the Edit tab!"}
              </ReactMarkdown>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
);
