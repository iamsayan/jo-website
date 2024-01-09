import Layout from "@/app/components/layout";
import Section from "@/app/components/section";

export const metadata = {
    title: 'Terms & Conditions',
    description: 'Please read these terms and conditions carefully before applying to become a member of Jagadhatri Online on our Website. You should understand that by applying to become a part of this Community, you agree to be bound by these terms and conditions.',
}

export default function Page() {
    return (
        <Layout title="Terms & Conditions">
            <Section title="Read Our" description={<>Terms <font color="#F4C040">Policy</font></>}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>Please read these terms and conditions carefully before applying to become a member of Jagadhatri
                        Online on our Website. You should understand that by applying to become a part of this
                        Community, you agree to be bound by these terms and conditions. To become a member of Jagadhatri
                        Online Community, follow the instructions below.</p>
                    <p>We welcome users to register on our digital platforms. All changes will be appended in the terms
                        and conditions pages and communicated to existing users by email.</p>
                    <p>1. The total registration procedure is free. On registration, we expect you to provide with an
                        accurate and complete information of the compulsory fields.<br/>2. We also expect you to keep
                        the secure specifically access password. Each registration is for a single user only.<br/>3.
                        Unauthorized use of this website may give raise to a claim for damages or criminal offense. Our
                        Service allows you to post, share and otherwise make available certain information, text,
                        graphics, videos, or other material (“Content”).<br/>4. You are responsible for the material in
                        other places like pages or websites.<br/>5. You must not allow any third party to access the
                        site using your username and password and make use of the sites on your behalf. If the
                        information given by the member at the time of registration proved incorrect then the authority
                        has full right to take major step against him/her.<br/>6. All registered members are abide by
                        the Terms and condition and privacy policy. It is the member’s responsibility of protecting the
                        privacy & policy of Jagadhatri Online Community. If any member creating violence inside the
                        group and page, the authority has the ability to take action against the respecting person.<br/>7.
                        Outside talking or bad languages can not be tolerated inside the group. The group is only
                        created for taking decision and other planning only.<br/>8. Members who have the permission to
                        post photos videos and others are requested to consult with admin. The use of logo and the
                        copyright is only for this authority and not to be shared with third-party.<br/>9. The
                        information given by the members at the time of registration are not shared with any other
                        member in this community for the privacy purpose.</p>

                    <p>Note : The contents of these website has its own copyright under the owner so any kind of
                        reproduction of this contents is strictly prohibited and the developer is not liable for any
                        content of the website. Design, Layout is registered under Skynix Web Studio & any reproduction
                        of this is strictly prohibited.</p>
                    <p>This content of the pages of this website is for your general information and use only. It is
                        subject to change without notice. The material includes, but is not limited to, the operator,
                        the design, layout, look, appearance and graphics. Reproduction is prohibited other than in
                        accordance with the copyright notice, which forms part of these terms and condition.</p>
                </div>
            </Section>
        </Layout>
    )
}