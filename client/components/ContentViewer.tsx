import React, { useEffect } from "react";
import { ContentSection } from "@shared/api";
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, Eye, Copy, Download, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from './ui/use-toast';

// Helper function to extract YouTube video ID
const getYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};
import {
  setupCopyProtection,
  disableDownload,
  addDynamicWatermark,
  protectImage,
  protectVideo,
} from "@/lib/contentSecurity";

interface ContentViewerProps {
  section: ContentSection;
  userName?: string;
  userId?: string;
  isLocked?: boolean;
}

export default function ContentViewer({
  section,
  userName = "User",
  userId = "123",
  isLocked = false,
}: ContentViewerProps) {
  const protection = section.protection;
  const shouldApplyWatermark =
    (protection.applyWatermark || protection.requiresPurchase) && !isLocked;

  useEffect(() => {
    const elementId = `section-${section.id}`;

    if (protection.applyWatermark || protection.requiresPurchase) {
      if (!protection.allowCopy) {
        setupCopyProtection(elementId);
      }
      if (!protection.allowDownload) {
        disableDownload(elementId);
      }
      if (shouldApplyWatermark) {
        addDynamicWatermark(elementId, userName, userId);
      }
    }
  }, [section.id, protection, shouldApplyWatermark, userName, userId]);

  const renderLockedOverlay = () => {
    if (isLocked || protection.accessLevel === "locked") {
      return (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Content Locked
            </h3>
            <p className="text-slate-600 mb-4">
              {protection.requiresPurchase
                ? "Purchase this course to unlock this content"
                : "You don't have access to this content yet"}
            </p>
            {protection.requiresPurchase && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                Unlock Now
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTextContent = () => {
    if (section.type !== "text" || !section.content) return null;

    const locked = !protection.allowCopy;
    const classes = locked ? "locked-content" : "";

    return (
      <div id={`section-${section.id}`} className={`relative ${classes}`}>
        {renderLockedOverlay()}
        <div className="prose prose-sm max-w-none">
          <p
            style={{
              fontSize: section.formatting?.fontSize || "16px",
              fontFamily: section.formatting?.fontFamily || "inherit",
              color: section.formatting?.textColor || "inherit",
            }}
            className="text-slate-700 leading-relaxed"
          >
            {section.content}
          </p>
        </div>
      </div>
    );
  };

  const renderCodeContent = () => {
    if (section.type !== "code" || !section.code) return null;

    const locked = !protection.allowCopy;

    return (
      <div
        id={`section-${section.id}`}
        className={`relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50 ${locked ? "locked-content" : ""}`}
      >
        {renderLockedOverlay()}

        {section.code.fileName && (
          <div className="bg-slate-900 text-slate-100 px-4 py-2 text-sm font-mono flex items-center justify-between">
            <span>{section.code.fileName}</span>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded">
              {section.code.language}
            </span>
          </div>
        )}

        <div className="p-4">
          <pre className="overflow-x-auto">
            <code
              className="text-sm font-mono text-slate-800"
              style={{
                userSelect: locked ? "none" : "auto",
              }}
            >
              {section.code.code}
            </code>
          </pre>
        </div>

        {locked && (
          <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">
              Copy and download disabled for this content
            </span>
          </div>
        )}

        {!locked && (
          <div className="bg-slate-100 border-t border-slate-200 px-4 py-3 flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(section.code?.code || "");
              }}
              className="flex items-center gap-2 text-xs bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded border border-slate-200"
            >
              <Copy className="w-3 h-3" />
              Copy Code
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderImageContent = () => {
    if (section.type !== "image" || !section.media) return null;

    const image = Array.isArray(section.media) ? section.media[0] : section.media;

    return (
      <div
        id={`section-${section.id}`}
        className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-100"
      >
        {renderLockedOverlay()}
        <img
          src={image.url}
          alt={image.fileName}
          className="w-full h-auto"
          onLoad={() => {
            protectImage(`section-${section.id}`);
          }}
          style={{
            userSelect: "none",
          }}
        />
        <div className="p-3 bg-slate-50">
          <p className="text-sm text-slate-600">{image.fileName}</p>
          {image.fileSize && (
            <p className="text-xs text-slate-400">
              {Math.round(image.fileSize / 1024)}KB
            </p>
          )}
        </div>
        {protection.applyWatermark && (
          <div className="absolute bottom-4 right-4 bg-slate-900/50 text-white text-xs px-3 py-1 rounded">
            Protected Content
          </div>
        )}
      </div>
    );
  };

  const renderVideoContent = () => {
    if (section.type !== "video" || !section.media) return null;

    const video = Array.isArray(section.media) ? section.media[0] : section.media;
    const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');

    return (
      <div
        id={`section-${section.id}`}
        className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-900"
      >
        {renderLockedOverlay()}
        <div className="relative pt-[56.25%] bg-slate-900">
         {isYouTube ? (
  <iframe
    src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}`}
    title={section.title}
    allowFullScreen
    className="absolute inset-0 w-full h-full border-0"
    style={{
      pointerEvents: protection.applyWatermark ? "none" : "auto",
    }}
  />
) : (
  <>
    {protection.applyWatermark && (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="text-white/30 text-2xl font-bold rotate-45">
          Protected
        </div>
      </div>
    )}
  </>
)}

        </div>
      </div>
    );
};

  const renderNoteContent = () => {
    if (section.type !== "note" || !section.content) return null;

    const colors = {
      info: "bg-blue-50 border-blue-200 text-blue-900",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
      success: "bg-green-50 border-green-200 text-green-900",
      error: "bg-red-50 border-red-200 text-red-900",
    };

    const icons = {
      info: <AlertCircle className="w-5 h-5" />,
      warning: <AlertCircle className="w-5 h-5" />,
      success: <AlertCircle className="w-5 h-5" />,
      error: <AlertCircle className="w-5 h-5" />,
    };

    const style = section.noteStyle || "info";

    return (
      <div
        id={`section-${section.id}`}
        className={`border-l-4 border rounded-r-lg p-4 ${colors[style]} flex gap-3`}
      >
        {icons[style]}
        <div>
          <h4 className="font-semibold mb-1">{section.title}</h4>
          <p className="text-sm">{section.content}</p>
        </div>
      </div>
    );
  };

  const renderChallengeContent = () => {
    if (section.type !== "challenge" || !section.challenge) return null;

    return (
      <div
        id={`section-${section.id}`}
        className="border border-blue-200 bg-blue-50 rounded-lg p-6"
      >
        {renderLockedOverlay()}
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
            ✓
          </div>
          <div>
            <h3 className="font-bold text-blue-900">{section.title}</h3>
            <p className="text-sm text-blue-700 mt-1">
              {section.challenge.instructions}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {section.challenge.sampleInput && (
            <div className="bg-white border border-blue-100 rounded p-4">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">
                Sample Input
              </h4>
              <pre className="text-xs text-slate-600 overflow-x-auto">
                {section.challenge.sampleInput}
              </pre>
            </div>
          )}
          {section.challenge.expectedOutput && (
            <div className="bg-white border border-blue-100 rounded p-4">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">
                Expected Output
              </h4>
              <pre className="text-xs text-slate-600 overflow-x-auto">
                {section.challenge.expectedOutput}
              </pre>
            </div>
          )}
        </div>

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm">
          Start Challenge
        </button>
      </div>
    );
  };

  const renderPDFContent = () => {
    if (section.type !== "pdf" || !section.media) return null;

    const pdf = Array.isArray(section.media) ? section.media[0] : section.media;

    return (
      <div
        id={`section-${section.id}`}
        className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50 h-[600px]"
      >
        {renderLockedOverlay()}
        <embed
          src={pdf.url}
          type="application/pdf"
          className="w-full h-full"
          style={{
            pointerEvents: protection.applyWatermark ? "none" : "auto",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 text-white p-2 text-sm">
          {pdf.fileName} ({Math.round(pdf.fileSize / 1024)}KB)
        </div>
        {protection.applyWatermark && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-slate-400/30 text-4xl font-bold rotate-45">
              Protected
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAudioContent = () => {
    if (section.type !== "audio" || !section.media) return null;

    const audio = Array.isArray(section.media) ? section.media[0] : section.media;

    return (
      <div
        id={`section-${section.id}`}
        className="relative border border-slate-200 rounded-lg p-4 bg-slate-50"
      >
        {renderLockedOverlay()}
        <div className="flex items-center gap-4">
          <audio
            controls
            controlsList="nodownload"
            className="flex-1"
            style={{
              pointerEvents: protection.applyWatermark ? "none" : "auto",
            }}
          >
            <source src={audio.url} type={audio.mimeType} />
            Your browser does not support the audio element.
          </audio>
          <div className="text-sm text-slate-500">
            {Math.round(audio.fileSize / 1024)}KB
          </div>
        </div>
        {protection.applyWatermark && (
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
            <Lock className="w-3 h-3" />
            Download disabled for this content
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (section.type) {
      case "text":
        return renderTextContent();
      case "code":
        return renderCodeContent();
      case "image":
        return renderImageContent();
      case "video":
        return renderVideoContent();
      case "note":
        return renderNoteContent();
      case "challenge":
        return renderChallengeContent();
      case "pdf":
        return renderPDFContent();
      case "audio":
        return renderAudioContent();
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      {section.title && (
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {section.title}
        </h3>
      )}
      {section.description && (
        <p className="text-slate-600 text-sm mb-4">{section.description}</p>
      )}
      <div className="relative">{renderContent()}</div>
    </div>
  );
}
