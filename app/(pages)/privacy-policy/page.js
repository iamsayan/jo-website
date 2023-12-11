import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import schema from "@/app/utils/schema";

export const metadata = {
    title: 'Privacy Policy',
    description: 'We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.',
}

export default function Page() {
    const jsonLd = schema({
        slug: 'privacy-policy',
        title: 'Privacy Policy',
    })

    return (
        <Layout title="Privacy Policy" jsonLd={jsonLd}>
            <Section title="Read Our" description={ <>Privacy <font color="#F4C040">Policy</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p><strong>JO Stream App Privacy Policy:</strong></p>
                    <p>JagadhatriOnline Team built the JO Stream app as a Free app. This SERVICE is provided by JagadhatriOnline at no cost and is intended for use as is.</p>
                    <p>This page is used to inform app users regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p>
                    <p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                    <p>We don’t collect and share any data as this app is just for LIVE Streaming on our Platform.</p>
                    <p>The terms used in this Privacy Policy have the same meaning as in our Terms of Use, which is accessible at CGR Utsav unless otherwise defined in this Privacy Policy.</p>
                    <p><strong>CGR Utsav App Privacy Policy:</strong></p>
                    <p>JagadhatriOnline Team built the CGR Utsav app as a Free app. This SERVICE is provided by JagadhatriOnline at no cost and is intended for use as is.</p>
                    <p>This page is used to inform app users regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p>
                    <p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                    <p>The terms used in this Privacy Policy have the same meaning as in our Terms of Use, which is accessible at CGR Utsav unless otherwise defined in this Privacy Policy.</p>
                    <p>To delete data, user needs to contact us via info@jagadhatrionline.co.in.</p>
                    <p><strong>Information Collection and Use</strong></p>
                    <p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request is will be retained by us and used as described in this privacy policy.</p>
                    <p>The app does use third party services that may collect information used to identify you. This list may change in the event the Application changes.</p>
                    <p><strong><em>Account and user profile information</em></strong><br />Facebook/gmail profile<br />User prefernces<br />Access to a person’s location<br />Access to a person’s DOB, name, photo and gender<br />Application specific data<br />Log Data</p>
                    <p>We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p>
                    <p><strong>Cookies</strong></p>
                    <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your device internal memory.</p>
                    <p>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collection information and to improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</p>
                    <p><strong>Service Providers</strong></p>
                    <p>We may employ third-party companies and individuals due to the following reasons:</p>
                    <p>To facilitate our Service;<br />To provide the Service on our behalf;<br />To perform Service-related services; or<br />To assist us in analyzing how our Service is used.</p>
                    <p>We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
                    <p><strong>Security</strong></p>
                    <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
                    <p><strong>Links to Other Sites</strong></p>
                    <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                    <p><strong>Children’s Privacy</strong></p>
                    <p>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>
                    <p><strong>Changes to This Privacy Policy</strong></p>
                    <p>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
                    <p><strong>Contact Us</strong></p>
                    <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us. Email Us: cgrjagadhatripuja@gmail.com</p>
                    <p><strong>Community Privacy Policy:</strong></p>
                    <p>1. Design, layout, information and the consulting matters into the group are not to be disclosed to any other third party.<br />2. Each and every member into this community have to take permission from the admin before taking any decision about the page or website. If any member found anything wrong or damaged like information or any part of website and page, he is requested to inform the admin as soon as possible.<br />3. If anyone inside the member wants to post anything news, pictures or share anything inside the page, she/he have to take permission from the admin fast.<br />4. If any changes necessary inside the page, website and also in the other part of them, it must be informed to the admin and after that necessary steps will be take.<br />5. If any member feel any problem inside the group or page, or getting harassment from any other member, are requested to inform the admin through personal chat, and the measures will be taken against that person after judgment.<br />6. If any member passing information by breaking the copyright to any third-party, necessary steps are taken against him/her.</p>
                    <p><strong>COPYRIGHT INFRINGEMENT</strong><br />If you want to report a case of copyright infringement, please sent an email to cgrjagadhatripuja@gmail.com or contact us and include the full name and address of you. Within 2 days copyright infringement notices will be investigated.</p>
                </div>
            </Section>
        </Layout>
    )
}