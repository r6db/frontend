import * as React from 'react';
import { hot } from 'react-hot-loader';
import Page, { PageHead, PageContent } from 'components/misc/Page';
import './privacy.scss';

function Privacy(props) {
    return (
        <Page className="privacy">
            <PageHead>
                <div className="container">
                    <div className="header">Privacy Policy</div>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small">
                    <p>
                        This document contains information on all data that r6db.com accesses or
                        transfers for the website at r6db.com. If you questions or want more
                        information about our Privacy Policy, please email us at info@r6db.com.
                    </p>
                    <h2>Personal Data</h2>
                    <p>
                        to be able to provide this website, we do process personal data: Your
                        Profile ID, as well as your Aliases. This processing happens under <a href="https://gdpr-info.eu/art-6-gdpr/">GDPR Article
                        6. 1f ('legitimate interest')</a>. If you do not want your data to be processed,
                        you can <a href="/delete">delete</a> your profile which also blacklists it
                        form being re-added. We also periodically delete inactive profiles, as well
                        as profiles which underlying uplay account was deactivated.
                    </p>
                    <h2>Log Files</h2>
                    <p>
                        Like most servers, we store server logs of all requests. These logs include
                        information such as the users ip address, a timestamp, the browsers
                        user agent and the target url. We need to save the ip address to identify bad
                        requests (such as rogue scripts spamming us). These logs are kept for 14
                        days and deleted afterwards.
                    </p>
                    <h2>Cookies and Web Beacons</h2>
                    <p>
                        We use cookies and similar technologies to locally data such as your
                        settings, or selected platform. Cookies are also used by our ad network and
                        our cdn provider (more info further below).
                    </p>
                    <p>
                        You can block cookies through your web browser's settings. Please consult your
                        browser's "help" guide on how to do this.
                    </p>
                    <h2>Third Parties</h2>
                        Our privacy policy does not apply to our used third-party services. We heavily
                        advise you to read the linked documents.
                    <p>
                        Third-party ad servers or ad networks uses technologies like cookies,
                        JavaScript, or Web Beacons that are used in their respective advertisements
                        and links that appear on R6db.com, which are sent directly to users'
                        browser. They automatically receive your IP address when this occurs. These
                        technologies are used to measure the effectiveness of their advertising
                        campaigns and/or to personalize the advertising content that you see on
                        websites that you visit.
                    </p>
                    <p>
                        Note that R6db.com has no access to or control over these cookies that are
                        used by third-party advertisers.
                    </p>
                    <h3>Cloudflare</h3>
                    <p>
                        <a href="https://www.cloudflare.com">Cloudflare</a> is a popular service
                        providing DDoS-protection, caching and DNS for us. They also use server
                        logs, as well as cookies to provide data such as 'unique users' (here the
                        cookie is used as an anonymous id). You can find Cloudflare's privacy policy
                        here:{" "}
                        <a href="https://www.cloudflare.com/privacypolicy/">
                            https://www.cloudflare.com/privacypolicy/
                        </a>
                    </p>
                    <h2>Children's Information</h2>
                    <p>
                        Another part of our priority is adding protection for children while using
                        the internet. We encourage parents and guardians to observe, participate in,
                        and/or monitor and guide their online activity.
                    </p>
                    <p>
                        R6db.com does not knowingly collect any Personal Identifiable Information
                        from children under the age of 13. If you think that your child provided
                        this kind of information on our website, we strongly encourage you to{" "}
                        <a href="/delete">delete and blacklist the Account</a>
                    </p>
                    <h2>Online Privacy Policy Only</h2>
                    <p>
                        This privacy policy applies only to our online activities and is valid for
                        visitors to our website with regards to the information that they shared
                        and/or collect in r6db.com. This policy is not applicable to any information
                        collected offline or via channels other than this website.
                    </p>
                    <h2>Consent</h2>
                    <p>
                        By using our website, you hereby consent to our Privacy Policy and agree to
                        its Terms and Conditions.
                    </p>
                </div>
            </PageContent>
        </Page>
    );
}

export default hot(module)(Privacy);
