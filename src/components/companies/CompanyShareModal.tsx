import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Company } from "@/types/company.types";
import {
  CheckCircle2,
  Copy,
  Facebook,
  Link,
  Linkedin,
  Mail,
  MessageSquare,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";

/**
 * Props for the CompanyShareModal component
 * @typedef {Object} CompanyShareModalProps
 * @property {boolean} isOpen - Whether the modal is open
 * @property {() => void} onClose - Function to call when closing the modal
 * @property {Company} company - Company data to share
 */

/**
 * CompanyShareModal - Dialog for sharing company information
 */
export const CompanyShareModal = ({ isOpen, onClose, company }) => {
  const [copied, setCopied] = useState(false);

  // Generate shareable URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/firme/${company.cui}`;
  };

  // Generate share text
  const getShareText = () => {
    return `Verifică compania ${company.denumire} (CUI: ${company.cui}) pe Targetare.ro`;
  };

  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(getShareUrl())
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Social media share URLs
  const getTwitterShareUrl = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(getShareUrl());
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  };

  const getLinkedInShareUrl = () => {
    const url = encodeURIComponent(getShareUrl());
    const title = encodeURIComponent(company.denumire);
    const summary = encodeURIComponent(
      `Informații despre compania ${company.denumire} (CUI: ${company.cui})`,
    );
    return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`;
  };

  const getFacebookShareUrl = () => {
    const url = encodeURIComponent(getShareUrl());
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(`${getShareText()}\n${getShareUrl()}`);
    return `https://wa.me/?text=${text}`;
  };

  const getEmailShareUrl = () => {
    const subject = encodeURIComponent(
      `Informații despre compania: ${company.denumire}`,
    );
    const body = encodeURIComponent(
      `Cred că te-ar putea interesa această companie:\n\n${company.denumire} (CUI: ${company.cui})\n\n${getShareUrl()}`,
    );
    return `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Distribuie Compania
          </DialogTitle>
          <DialogDescription>
            Distribuie detaliile companiei {company?.denumire}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Link sharing */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4 text-gray-500" />
              <label htmlFor="share-link" className="text-sm font-medium">
                Link către companie
              </label>
            </div>
            <div className="flex space-x-2">
              <Input
                id="share-link"
                defaultValue={getShareUrl()}
                readOnly
                className="flex-1"
              />
              <Button
                variant={copied ? "success" : "outline"}
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Copiat!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copiază</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sharing options */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Share2 className="h-4 w-4 text-gray-500" />
              Distribuie prin
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {/* Social sharing buttons */}
              <a
                href={getTwitterShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1DA1F2] px-3 py-2 text-sm font-medium text-white hover:bg-[#1a91da] focus:outline-none"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>

              <a
                href={getLinkedInShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0077B5] px-3 py-2 text-sm font-medium text-white hover:bg-[#00669c] focus:outline-none"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href={getFacebookShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1877F2] px-3 py-2 text-sm font-medium text-white hover:bg-[#166fe5] focus:outline-none"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>

              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-sm font-medium text-white hover:bg-[#22c35e] focus:outline-none"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </a>

              <a
                href={getEmailShareUrl()}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-500 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
