var currentLanguage = document.documentElement.lang;
window.tarteaucitronForceLanguage = currentLanguage;

tarteaucitron.init({
  AcceptAllCta: true,
  cookieslist: false,
  highPrivacy: true,
  moreInfoLink: true,
  orientation: 'bottom',
  privacyUrl: '/donnees-personnelles-et-gestion-des-cookies',
  DenyAllCta: true,
  readmoreLink: '/donnees-personnelles-et-gestion-des-cookies',
  removeCredit: true,
  showAlertSmall: false,
  useExternalCss: false,
  mandatory: true
});

tarteaucitron.user.matomoId = 178;
tarteaucitron.user.matomoHost = 'https://stats.data.gouv.fr/';
(tarteaucitron.job = tarteaucitron.job || []).push('matomo');

tarteaucitron.user.gtagUa = 'DC-2953234';
tarteaucitron.user.gtagMore = function () {
  window.gtag('event', 'conversion', {
    'allow_custom_scripts': true,
    'send_to': 'DC-2953234/SIG-M0/lppsyenf+unique'
  });
};
(tarteaucitron.job = tarteaucitron.job || []).push('gtag');
