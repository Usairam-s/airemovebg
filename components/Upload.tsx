"use client";

import React, { useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { FiUpload, FiImage } from "react-icons/fi";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface UploadResponse {
  url: string;
  fileId: string;
  filePath: string;
}

interface UploadError {
  message: string;
}

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendToWebhook = async (imageData: UploadResponse) => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: imageData.url }),
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();
      if (data.processedImageUrl) {
        setProcessedImage(data.processedImageUrl);
      }
    } catch (error) {
      console.error("Webhook error:", error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (error: UploadError) => {
    console.error("Upload error:", error);
    setIsUploading(false);
    setError("Upload failed. Please try again.");
  };

  const onSuccess = async (response: UploadResponse) => {
    console.log("Upload successful:", response);
    setIsUploading(false);
    setPreview(response.url);

    try {
      await sendToWebhook(response);
      setIsProcessing(false);
    } catch (error) {
      console.error("Processing error:", error);
      setError("Failed to process image. Please try again.");
      setIsProcessing(false);
    }
  };

  const onUploadStart = () => {
    setIsUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    // Max size 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return false;
    }

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href={"/"} className="text-2xl font-bold text-indigo-600">
            AI RemoveBG
          </Link>
          <SignOutButton>
            <Button variant={"outline"}>Sign Out</Button>
          </SignOutButton>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Remove Image Background
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload your image and our AI will instantly remove the
                background with precision
              </p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="p-8">
            <ImageKitProvider
              publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string}
              urlEndpoint={
                process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string
              }
              authenticator={async () => {
                const res = await fetch("/api/upload-auth");
                if (!res.ok) throw new Error("Failed to authenticate");
                return await res.json();
              }}
            >
              {!preview ? (
                <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-12 bg-gradient-to-br from-indigo-25 to-blue-25 hover:border-indigo-300 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                      <FiUpload className="w-10 h-10 text-indigo-600" />
                    </div>
                    <IKUpload
                      className="hidden"
                      id="file-upload"
                      onError={onError}
                      onSuccess={onSuccess}
                      onUploadStart={onUploadStart}
                      validateFile={validateFile}
                      useUniqueFileName={true}
                      folder="/uploads"
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Choose Your Image
                    </label>
                    <p className="mt-4 text-sm text-gray-500">
                      Supports JPG, PNG • Max file size: 5MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Images Container */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Original Image */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Original Image
                        </h3>
                      </div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 shadow-lg">
                        <Image
                          src={preview}
                          alt="Original"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* Processed Image */}
                    {preview && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              processedImage
                                ? "bg-green-400"
                                : isProcessing
                                ? "bg-indigo-400 animate-pulse"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {isProcessing
                              ? "Processing with AI..."
                              : processedImage
                              ? "Background Removed ✨"
                              : "Ready to Process"}
                          </h3>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
                          {processedImage ? (
                            <>
                              <Image
                                src={processedImage}
                                alt="Processed"
                                fill
                                className="object-contain"
                                priority
                                onError={(e) => {
                                  e.currentTarget.classList.add("loading");
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 loading-message hidden rounded-xl">
                                <div className="text-center px-6">
                                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-indigo-600 text-xl">
                                      ⏳
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    High resolution image is processing.
                                    Download and wait a moment for it to appear.
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              {isProcessing ? (
                                <div className="flex flex-col items-center space-y-4">
                                  <div className="relative">
                                    <div className="w-12 h-12 rounded-full border-4 border-indigo-100"></div>
                                    <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm font-medium text-indigo-600">
                                      AI is removing background...
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      This usually takes a few seconds
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FiImage className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    Ready to process your image
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {processedImage && (
                          <div className="space-y-3">
                            <div className="text-sm text-gray-600 text-center p-3 bg-blue-50 rounded-lg">
                              💡 <strong>Pro tip:</strong> For high-resolution
                              images, click download and wait a few seconds if
                              the preview doesn&apos;t load immediately.
                            </div>
                            <div className="flex justify-center">
                              <a
                                href={processedImage}
                                download
                                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                target="_blank"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                Download Image
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Upload New Image Button */}
                  <div className="flex justify-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setPreview(null);
                        setProcessedImage(null);
                        setError(null);
                      }}
                      className="px-6 py-3 text-indigo-600 border-2 border-indigo-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 font-medium"
                    >
                      Process Another Image
                    </button>
                  </div>
                </div>
              )}
            </ImageKitProvider>
          </div>

          {/* Loading States */}
          {(isUploading || isProcessing) && (
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-indigo-100">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-100"></div>
                  <div className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-indigo-700 font-medium">
                  {isUploading
                    ? "Uploading your image..."
                    : "AI is removing the background..."}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="px-8 py-6 bg-red-50 border-t border-red-100">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✕</span>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
