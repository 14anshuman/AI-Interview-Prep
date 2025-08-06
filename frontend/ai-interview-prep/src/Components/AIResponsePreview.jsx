import React, { useState } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match?.[1] || "";

              return !inline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}

                />
              ) : (
                <code className="px-1 py-0.5 bg-gray-200 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2">{children}</ol>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="table-auto border border-gray-300">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2 border text-left bg-gray-100 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 border text-left">{children}</td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-md border border-gray-300 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {language || "Code"}
        </span>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-black transition"
          title="Copy code"
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "white",
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default AIResponsePreview;
