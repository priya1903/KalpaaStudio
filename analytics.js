(()=>{
  const MEASUREMENT_ID='G-EJRNRTBCPQ';
  const CONSENT_KEY='kalpaa_analytics_consent';
  let started=false;

  function startAnalytics(){
    if(started)return;
    started=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)};
    gtag('js',new Date());
    gtag('config',MEASUREMENT_ID,{anonymize_ip:true});
    const script=document.createElement('script');
    script.async=true;
    script.src=`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
    const productId=new URLSearchParams(location.search).get('id');
    const productName=document.querySelector('.detail-panel h1')?.textContent;
    if(productId&&productName)gtag('event','view_item',{currency:'USD',items:[{item_id:productId,item_name:productName}]});
  }

  function ensureBanner(){
    let banner=document.getElementById('analyticsConsent');
    if(banner)return banner;
    banner=document.createElement('section');
    banner.id='analyticsConsent';
    banner.className='consent-banner';
    banner.setAttribute('role','dialog');
    banner.setAttribute('aria-labelledby','analyticsConsentTitle');
    banner.innerHTML=`<div><h2 id="analyticsConsentTitle">Help us improve Kalpaa Studio</h2><p>With your permission, we use Google Analytics to understand visits and which products interest shoppers. No advertising cookies are used. <a href="privacy.html"><u>Learn more</u></a>.</p></div><div class="consent-actions"><button class="button secondary" type="button" data-consent="denied">No thanks</button><button class="button primary" type="button" data-consent="granted">Allow analytics</button></div>`;
    document.body.appendChild(banner);
    banner.addEventListener('click',event=>{
      const choice=event.target.closest('[data-consent]')?.dataset.consent;
      if(!choice)return;
      localStorage.setItem(CONSENT_KEY,choice);
      banner.hidden=true;
      if(choice==='granted')startAnalytics();
      else if(started)location.reload();
    });
    return banner;
  }

  function showPreferences(){ensureBanner().hidden=false}
  document.querySelectorAll('[data-analytics-settings]').forEach(button=>button.addEventListener('click',showPreferences));
  const choice=localStorage.getItem(CONSENT_KEY);
  if(choice==='granted')startAnalytics();
  else if(!choice)showPreferences();

  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href*="etsy.com"]');
    if(!link||!started)return;
    gtag('event','etsy_click',{link_url:link.href,product_name:document.querySelector('.detail-panel h1')?.textContent||'Shop'});
  });
})();
