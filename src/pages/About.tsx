import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export default function About() {
  const { t } = useTranslations();

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-primary">Mega</span>
            <span className="text-secondary"> Mobile</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('about.tagline')}
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-heading font-bold mb-4">{t('about.story.title')}</h2>
          <p className="text-muted-foreground mb-4">
            {t('about.story.paragraph1')}
          </p>
          <p className="text-muted-foreground">
            {t('about.story.paragraph2')}
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-heading font-bold mb-2">{t('about.values.innovation.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.values.innovation.description')}
            </p>
          </div>
          <div className="border rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">💎</div>
            <h3 className="font-heading font-bold mb-2">{t('about.values.quality.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.values.quality.description')}
            </p>
          </div>
          <div className="border rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-heading font-bold mb-2">{t('about.values.trust.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.values.trust.description')}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border rounded-2xl p-8 bg-card">
          <h2 className="text-2xl font-heading font-bold mb-6">{t('about.contact.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('about.contact.address')}</h3>
                <p className="text-sm text-muted-foreground">
                  Bd. Ștefan cel Mare 123<br />
                  Chișinău, MD-2001, Moldova
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('about.contact.phone')}</h3>
                <p className="text-sm text-muted-foreground">
                  +373 22 123 456<br />
                  +373 79 123 456
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('about.contact.email')}</h3>
                <p className="text-sm text-muted-foreground">
                  info@megamobile.md<br />
                  support@megamobile.md
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('about.contact.hours')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('about.contact.weekdays')}: 09:00 - 20:00<br />
                  {t('about.contact.weekend')}: 10:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
