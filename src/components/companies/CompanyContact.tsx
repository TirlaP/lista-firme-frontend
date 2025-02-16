import { Company } from "@/types/company.types";
import { 
  Building2, 
  Globe, 
  Mail, 
  MapPin, 
  Phone,
  Smartphone,
  AtSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CompanyContactProps {
  company: Company;
}

export const CompanyContact = ({ company }: CompanyContactProps) => {
  const contactMethods = [
    {
      icon: Phone,
      label: "Phone",
      value: company.contact?.telefon,
      href: `tel:${company.contact?.telefon}`,
      show: !!company.contact?.telefon
    },
    {
      icon: Smartphone,
      label: "Mobile",
      value: company.contact?.mobil,
      href: `tel:${company.contact?.mobil}`,
      show: !!company.contact?.mobil
    },
    {
      icon: Mail,
      label: "Email",
      value: company.contact?.email,
      href: `mailto:${company.contact?.email}`,
      show: !!company.contact?.email
    },
    {
      icon: Globe,
      label: "Website",
      value: company.contact?.website?.replace(/^https?:\/\//, ''),
      href: company.contact?.website,
      show: !!company.contact?.website,
      external: true
    }
  ];

  return (
    <div className="divide-y divide-gray-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AtSign className="h-5 w-5 text-gray-400" />
            Contact Information
          </h2>
          {company.date_generale?.TVA && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              TVA
            </Badge>
          )}
        </div>
      </div>

      {/* Contact Methods */}
      <div className="p-6">
        <div className="space-y-4">
          {contactMethods.filter(method => method.show).map((method, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <method.icon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 mb-0.5">{method.label}</p>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-900">{method.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Primary Address</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
              <address className="text-sm not-italic space-y-1">
                <p className="text-gray-900">
                  {company.adresa.strada} {company.adresa.numar}
                  {company.adresa.bloc && `, Bl. ${company.adresa.bloc}`}
                  {company.adresa.scara && `, Sc. ${company.adresa.scara}`}
                  {company.adresa.etaj && `, Et. ${company.adresa.etaj}`}
                  {company.adresa.apartament && `, Ap. ${company.adresa.apartament}`}
                </p>
                <p className="text-gray-600">
                  {company.adresa.localitate}, {company.adresa.judet}
                </p>
                {company.adresa.cod_postal && (
                  <p className="text-gray-500">
                    {company.adresa.cod_postal}
                  </p>
                )}
                {company.adresa.detalii && (
                  <p className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">
                    {company.adresa.detalii}
                  </p>
                )}
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};