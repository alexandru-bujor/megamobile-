import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from '@/lib/i18n';

export function Footer() {
  const { t } = useTranslations();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-heading font-bold mb-4">
              <span className="text-primary">Mega</span>
              <span className="text-secondary"> Mobile</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('hero.subtitle')}
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t('nav.catalog')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog/smartphones" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.smartphones')}
                </Link>
              </li>
              <li>
                <Link to="/catalog/laptops" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.laptops')}
                </Link>
              </li>
              <li>
                <Link to="/catalog/tablets" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.tablets')}
                </Link>
              </li>
              <li>
                <Link to="/catalog/accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.accessories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t('nav.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.warranty')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.newsletterCta')}
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Email" 
                className="flex-1"
              />
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Mega Mobile. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
