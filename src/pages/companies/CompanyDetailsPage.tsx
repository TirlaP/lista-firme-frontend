import { CompanyShareModal } from "@/components/companies/CompanyShareModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { cn } from "@/utils/cn";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  BarChart2,
  Book,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Landmark,
  Mail,
  MapPin,
  Navigation,
  Phone,
  PieChart,
  Printer,
  Share2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * CompanyDetailsPage - Displays detailed information about a specific company
 */
export const CompanyDetailsPage = () => {
  const { cui } = useParams();
  const navigate = useNavigate();
  const { data: company, isLoading, error } = useCompanyDetails(cui);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Scroll to top when company changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cui]);

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  // Copy text to clipboard with confirmation
  const copyToClipboard = (text, fieldName) => {
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  // Helpers for UI
  const getStatusColor = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower.includes("activ"))
      return "bg-green-100 text-green-800 border-green-200";
    if (statusLower.includes("inactiv") || statusLower.includes("radiat"))
      return "bg-red-100 text-red-800 border-red-200";
    if (statusLower.includes("suspend"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ro-RO");
    } catch (e) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: "RON",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format website URL to be user-friendly
  const formatWebsiteDisplay = (url) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  // Ensure website URL has protocol
  const formatWebsiteUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/firme")}
            className="gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi
          </Button>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-96 bg-gray-200 animate-pulse rounded lg:col-span-2"></div>
            <div className="h-96 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-64 bg-gray-200 animate-pulse rounded lg:col-span-3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/firme")}
            className="gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi
          </Button>
        </div>
        <div className="h-full flex flex-col items-center justify-center py-12">
          <div className="bg-red-50 rounded-full p-4 mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error ? "Eroare la încărcarea companiei" : "Companie negăsită"}
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            {error
              ? "Am întâmpinat o eroare încercând să încărcăm această companie. Vă rugăm să încercați din nou mai târziu."
              : "Compania pe care o căutați nu există sau este posibil să fi fost eliminată."}
          </p>
          <Button onClick={() => navigate("/firme")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la Companii
          </Button>
        </div>
      </div>
    );
  }

  // Extract contact information with fallbacks
  const contactInfo = {
    email: company.contact?.email || company.date_generale?.email || "",
    telefon: company.contact?.telefon || company.date_generale?.telefon || "",
    mobil: company.contact?.mobil || "",
    fax: company.contact?.fax || company.date_generale?.fax || "",
    website: company.contact?.website || company.date_generale?.website || "",
  };

  // Fiscal information
  const fiscalInfo = {
    status:
      company.inregistrare?.stare ||
      company.date_generale?.stare_inregistrare ||
      "funcțiune",
    registrationDate:
      company.inregistrare?.data || company.date_generale?.data_inregistrare,
    registrationNumber:
      company.inregistrare?.numar || company.date_generale?.nrRegCom,
    fiscalAuthority:
      company.inregistrare?.organ_fiscal ||
      company.date_generale?.organFiscalCompetent,
    vatRegistered: company.date_generale?.TVA || false,
    lastBalanceDate: company.date_generale?.data_bilant,
    lastUpdateDate: company.date_generale?.data_actualizare,
  };

  // Operational information
  const operationalInfo = {
    employees: company.date_generale?.numar_angajati || 0,
    revenue: company.date_generale?.cifra_afaceri || 0,
    profit: company.date_generale?.profit || 0,
    loss: company.date_generale?.pierdere || 0,
    socialCapital: company.date_generale?.capital_social || 0,
    assets: company.date_generale?.active || 0,
    branches: company.date_generale?.numar_sucursale || 0,
    officeLocations: company.date_generale?.numar_puncte_lucru || 0,
  };

  // Location information
  const location = {
    judet:
      company.adresa?.judet ||
      company.adresa_anaf?.sediu_social?.sdenumire_Judet ||
      "",
    localitate:
      company.adresa?.localitate ||
      company.adresa_anaf?.sediu_social?.sdenumire_Localitate ||
      "",
    strada:
      company.adresa?.strada ||
      company.adresa_anaf?.sediu_social?.sdenumire_Strada ||
      "",
    numar:
      company.adresa?.numar ||
      company.adresa_anaf?.sediu_social?.snumar_Strada ||
      "",
    full: company.adresa_completa || company.date_generale?.adresa || "",
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="space-y-6">
        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/firme")}
            className="gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi la Companii
          </Button>

          <div className="flex items-center gap-2 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              Printează
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareModalOpen(true)}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Distribuie
            </Button>
            <Button variant="primary" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportă PDF
            </Button>
          </div>
        </div>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-900">
                  {company.denumire}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium border",
                    getStatusColor(fiscalInfo.status),
                  )}
                >
                  {fiscalInfo.status || "N/A"}
                </Badge>
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {formatDate(fiscalInfo.registrationDate)}
                </span>
                <span className="text-sm text-gray-500">
                  CUI: {company.cui}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">
                  {location.full || "Adresă nedisponibilă"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informații generale section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-400" />
                Informații Generale
              </h2>
              <Tooltip
                content={
                  <div className="space-y-2 p-2">
                    <div className="font-medium border-b border-gray-700 pb-1">
                      Detalii companie
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>Status: {fiscalInfo.status || "N/A"}</p>
                      <p>
                        Înregistrare: {fiscalInfo.registrationNumber || "N/A"}
                      </p>
                      <p>TVA: {fiscalInfo.vatRegistered ? "Da" : "Nu"}</p>
                    </div>
                  </div>
                }
              >
                <AlertCircle className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
              </Tooltip>
            </div>
          </div>

          {/* Registration Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  Detalii Înregistrare
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Număr Înregistrare
                    </p>
                    <p className="text-sm">
                      {fiscalInfo.registrationNumber || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Data Înregistrării
                    </p>
                    <p className="text-sm">
                      {formatDate(fiscalInfo.registrationDate)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Cod Fiscal (CUI)
                    </p>
                    <p className="text-sm">{company.cui}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Autoritate Fiscală
                    </p>
                    <p className="text-sm">
                      {fiscalInfo.fiscalAuthority || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm font-medium text-gray-500">
                    Status TVA:
                  </p>
                  {fiscalInfo.vatRegistered ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 px-2 py-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Plătitor TVA</span>
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200 flex items-center gap-1 px-2 py-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Neplătitor TVA</span>
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Book className="h-4 w-4 text-gray-400" />
                  Detalii Activitate
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-500">
                        Cod CAEN
                      </p>
                      {company.caen && (
                        <Tooltip
                          content={
                            <div className="space-y-2 p-2">
                              <p className="font-medium">{company.caen.name}</p>
                              <div className="text-xs space-y-1 text-gray-200">
                                <p>Divizie: {company.caen.division}</p>
                                <p>Secțiune: {company.caen.section}</p>
                                {company.caen.description && (
                                  <p>Detalii: {company.caen.description}</p>
                                )}
                              </div>
                            </div>
                          }
                        >
                          <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                      )}
                    </div>
                    <div className="py-2 px-3 rounded-md bg-gray-50 border border-gray-100">
                      <p className="text-sm font-medium">
                        {company.cod_CAEN || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {company.caen?.name || "Activitate nespecificată"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Formă Juridică
                      </p>
                      <p className="text-sm">
                        {company.tip_firma?.forma_juridica || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Tip Organizare
                      </p>
                      <p className="text-sm">
                        {company.tip_firma?.forma_organizare || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {(company.date_generale?.capital_social ||
            company.date_generale?.numar_angajati ||
            company.date_generale?.cifra_afaceri) && (
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                <Landmark className="h-4 w-4 text-gray-400" />
                Prezentare Generală Financiară și Operațională
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {company.date_generale?.capital_social && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-xs font-medium text-blue-600 mb-1">
                      Capital Social
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(company.date_generale.capital_social)}
                    </p>
                  </div>
                )}

                {company.date_generale?.numar_angajati && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                    <p className="text-xs font-medium text-green-600 mb-1">
                      Angajați
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {company.date_generale.numar_angajati.toLocaleString()}
                    </p>
                  </div>
                )}

                {company.date_generale?.cifra_afaceri && (
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                    <p className="text-xs font-medium text-purple-600 mb-1">
                      Cifră de Afaceri Anuală
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(company.date_generale.cifra_afaceri)}
                    </p>
                  </div>
                )}

                {company.date_generale?.data_bilant && (
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      Data Ultimului Bilanț
                    </p>
                    <p className="text-sm font-medium text-gray-900 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      {formatDate(company.date_generale.data_bilant)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes and warnings */}
          {company.date_generale?.observatii && (
            <div className="p-6">
              <div className="flex items-start p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <HelpCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">
                    Observații
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {company.date_generale.observatii}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                Date de Contact
              </h2>
              {fiscalInfo.vatRegistered && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Plătitor TVA
                </Badge>
              )}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="p-6">
            <div className="space-y-4">
              {contactInfo.telefon && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Telefon</p>
                    <div className="flex items-center">
                      <a
                        href={`tel:${contactInfo.telefon}`}
                        className="text-sm text-blue-600 hover:text-blue-800 mr-2"
                      >
                        {contactInfo.telefon}
                      </a>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="h-6 w-6 p-0 rounded-full hover:bg-gray-100"
                        onClick={() =>
                          copyToClipboard(contactInfo.telefon, "telefon")
                        }
                      >
                        {copiedField === "telefon" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {contactInfo.email && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <div className="flex items-center">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800 mr-2 break-all"
                      >
                        {contactInfo.email}
                      </a>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="h-6 w-6 p-0 rounded-full hover:bg-gray-100 flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(contactInfo.email, "email")
                        }
                      >
                        {copiedField === "email" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {contactInfo.website && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Website</p>
                    <div className="flex items-center">
                      <a
                        href={formatWebsiteUrl(contactInfo.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center mr-2 break-all"
                      >
                        {formatWebsiteDisplay(contactInfo.website)}
                        <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                      </a>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="h-6 w-6 p-0 rounded-full hover:bg-gray-100 flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(contactInfo.website, "website")
                        }
                      >
                        {copiedField === "website" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!contactInfo.telefon &&
                !contactInfo.email &&
                !contactInfo.website && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-gray-100 p-3 mb-3">
                      <Mail className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Fără Informații de Contact
                    </p>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm">
                      Această companie nu a furnizat date de contact în
                      registru.
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Address */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900">
                  Adresă Înregistrată
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                  <address className="not-italic">
                    <div
                      className={cn(
                        "rounded-lg border border-gray-200",
                        location.full ? "p-3 bg-gray-50" : "p-2",
                      )}
                    >
                      {location.full ? (
                        <p className="text-sm text-gray-700">{location.full}</p>
                      ) : (
                        <div className="text-sm">
                          {location.strada && (
                            <p className="text-gray-900">
                              {location.strada} {location.numar}
                            </p>
                          )}
                          {(location.localitate || location.judet) && (
                            <p className="text-gray-600">
                              {location.localitate}
                              {location.localitate && location.judet
                                ? ", "
                                : ""}
                              {location.judet}
                            </p>
                          )}
                          {!location.strada && !location.localitate && (
                            <p className="text-gray-500 italic">
                              Adresă nedisponibilă
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Copy address button */}
                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        onClick={() =>
                          copyToClipboard(location.full, "address")
                        }
                      >
                        {copiedField === "address" ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            <span>Copiat!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copiază adresa</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-400" />
                Situație Financiară
              </h2>
              <Badge
                variant="outline"
                className={getStatusColor(fiscalInfo.status)}
              >
                {fiscalInfo.status || "N/A"}
              </Badge>
            </div>
          </div>

          {/* Financial Cards */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Registration Status */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    Stare Înregistrare
                  </h3>
                  <Tooltip
                    content={
                      <div className="space-y-1 p-2">
                        <p>
                          Ultima actualizare:{" "}
                          {formatDate(fiscalInfo.lastUpdateDate)}
                        </p>
                        <p>Sursă: {company.inregistrare?.sursa || "ANAF"}</p>
                      </div>
                    }
                  >
                    <AlertCircle className="h-4 w-4 text-gray-400 cursor-help" />
                  </Tooltip>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Stare</span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(fiscalInfo.status)}
                    >
                      {fiscalInfo.status || "N/A"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Dată înregistrare</span>
                    <span className="font-medium">
                      {formatDate(fiscalInfo.registrationDate)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Nr. înregistrare</span>
                    <span className="font-medium">
                      {fiscalInfo.registrationNumber || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Overview */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-gray-400" />
                    Prezentare Financiară
                  </h3>
                  <Tooltip
                    content={
                      <div className="space-y-1 p-2">
                        <p>
                          Data ultimului bilanț:{" "}
                          {formatDate(fiscalInfo.lastBalanceDate)}
                        </p>
                      </div>
                    }
                  >
                    <Calendar className="h-4 w-4 text-gray-400 cursor-help" />
                  </Tooltip>
                </div>

                <div className="space-y-2">
                  {operationalInfo.socialCapital > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Capital Social</span>
                      <span className="font-medium">
                        {formatCurrency(operationalInfo.socialCapital)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Înregistrare TVA</span>
                    <Badge
                      variant="outline"
                      className={
                        fiscalInfo.vatRegistered
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {fiscalInfo.vatRegistered ? "Da" : "Nu"}
                    </Badge>
                  </div>

                  {operationalInfo.revenue > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Cifră de afaceri</span>
                      <span className="font-medium">
                        {formatCurrency(operationalInfo.revenue)}
                      </span>
                    </div>
                  )}

                  {(operationalInfo.profit > 0 || operationalInfo.loss > 0) && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Profit/Pierdere</span>
                      <span
                        className={cn(
                          "font-medium",
                          operationalInfo.profit > 0
                            ? "text-green-600"
                            : "text-red-600",
                        )}
                      >
                        {operationalInfo.profit > 0
                          ? formatCurrency(operationalInfo.profit)
                          : operationalInfo.loss > 0
                            ? `-${formatCurrency(operationalInfo.loss)}`
                            : "N/A"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Employee Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    Organizare
                  </h3>
                </div>

                <div className="space-y-2">
                  {operationalInfo.employees > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Angajați</span>
                      <span className="font-medium">
                        {operationalInfo.employees.toLocaleString() || "N/A"}
                      </span>
                    </div>
                  )}

                  {company.tip_firma?.forma_juridica && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Formă Juridică</span>
                      <span
                        className="font-medium max-w-[160px] truncate text-right"
                        title={company.tip_firma.forma_juridica}
                      >
                        {company.tip_firma.forma_juridica}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Details Table */}
          {(operationalInfo.revenue > 0 || operationalInfo.profit > 0) && (
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                <BarChart2 className="h-4 w-4 text-gray-400" />
                Date Financiare{" "}
                {fiscalInfo.lastBalanceDate
                  ? `(${formatDate(fiscalInfo.lastBalanceDate)})`
                  : ""}
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Indicator
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Valoare
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {operationalInfo.revenue > 0 && (
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                          Cifră de afaceri
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-right font-medium">
                          {formatCurrency(operationalInfo.revenue)}
                        </td>
                      </tr>
                    )}

                    {(operationalInfo.profit > 0 ||
                      operationalInfo.loss > 0) && (
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                          {operationalInfo.profit > 0 ? "Profit" : "Pierdere"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-sm text-right font-medium ${
                            operationalInfo.profit > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {operationalInfo.profit > 0
                            ? formatCurrency(operationalInfo.profit)
                            : `-${formatCurrency(operationalInfo.loss)}`}
                        </td>
                      </tr>
                    )}

                    {operationalInfo.employees > 0 && (
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                          Număr angajați
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-right font-medium">
                          {operationalInfo.employees.toLocaleString()}
                        </td>
                      </tr>
                    )}

                    {operationalInfo.socialCapital > 0 && (
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                          Capital social
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-right font-medium">
                          {formatCurrency(operationalInfo.socialCapital)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-100 text-sm text-blue-800 text-center">
                Conform datelor financiare disponibile, riscul de insolvență
                este unul scăzut.
              </div>
            </div>
          )}
        </div>

        {/* Location Map */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                Localizare
              </h2>
            </div>
          </div>

          <div className="p-6">
            {location.judet || location.localitate ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Location info */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      Detalii Adresă
                    </h3>

                    <div className="space-y-3">
                      {/* Address badges */}
                      <div className="flex flex-wrap gap-2">
                        {location.judet && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 border-blue-100"
                          >
                            Județ: {location.judet}
                          </Badge>
                        )}

                        {location.localitate && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 border-green-100"
                          >
                            Localitate: {location.localitate}
                          </Badge>
                        )}
                      </div>

                      {/* Full address display */}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-800 break-words">
                          {location.full || (
                            <>
                              {location.strada} {location.numar}
                              {location.localitate && (
                                <>, {location.localitate}</>
                              )}
                              {location.judet && <>, {location.judet}</>},
                              România
                            </>
                          )}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => {
                            const addressParts = [];
                            if (location.strada && location.numar) {
                              addressParts.push(
                                `${location.strada} ${location.numar}`,
                              );
                            }
                            if (location.localitate) {
                              addressParts.push(location.localitate);
                            }
                            if (location.judet) {
                              addressParts.push(location.judet);
                            }
                            addressParts.push("România");
                            const address = encodeURIComponent(
                              addressParts.join(", "),
                            );
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${address}`,
                              "_blank",
                            );
                          }}
                        >
                          <Navigation className="h-4 w-4" />
                          Indicații
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => {
                            const addressText =
                              location.full ||
                              `${location.strada || ""} ${location.numar || ""}, ${location.localitate || ""}, ${location.judet || ""}, România`;
                            copyToClipboard(addressText, "address");
                          }}
                        >
                          <MapPin className="h-4 w-4" />
                          Copiază Adresa
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="lg:col-span-2">
                  <div className="h-full flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                      <Target className="h-4 w-4 text-gray-400" />
                      Localizare pe Hartă
                    </h3>

                    <div className="flex-1 min-h-[300px] rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-center px-4">
                          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">
                            Locație:
                            <br />
                            <span className="font-medium text-gray-700 mt-1 block">
                              {location.strada} {location.numar},{" "}
                              {location.localitate}, {location.judet}, România
                            </span>
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              const addressParts = [];
                              if (location.strada && location.numar) {
                                addressParts.push(
                                  `${location.strada} ${location.numar}`,
                                );
                              }
                              if (location.localitate) {
                                addressParts.push(location.localitate);
                              }
                              if (location.judet) {
                                addressParts.push(location.judet);
                              }
                              addressParts.push("România");
                              const address = encodeURIComponent(
                                addressParts.join(", "),
                              );
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${address}`,
                                "_blank",
                              );
                            }}
                          >
                            Deschide în Google Maps
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-gray-100 p-3 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Fără Date de Localizare
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  Această companie nu are informații de localizare disponibile
                  în registru.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Share Modal */}
        <CompanyShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          company={company}
        />
      </div>
    </div>
  );
};
