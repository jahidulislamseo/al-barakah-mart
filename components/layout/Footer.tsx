'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/lib/language-context'

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary">Al Barakah Mart</h3>
                        <p className="text-sm text-muted-foreground">
                            {t('footer.brand.desc')}
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Twitter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.quickLinks.title')}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">{t('footer.about')}</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">{t('footer.contact')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">{t('footer.privacy')}</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">{t('footer.terms')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.contact.title')}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{t('footer.address')}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>{t('footer.phone')}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>{t('footer.email')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.newsletter.title')}</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            {t('footer.newsletter.desc')}
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder={t('footer.newsletter.placeholder')} className="bg-background" />
                            <Button size="icon" variant="primary">
                                <span className="sr-only">{t('footer.newsletter.subscribe')}</span>
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>{t('footer.copyright').replace('2025', new Date().getFullYear().toString())}</p>
                </div>
            </div>
        </footer>
    )
}
