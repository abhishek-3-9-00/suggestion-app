import {
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verificaiton code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello, {username},</Heading>
        </Row>
        <Row>
          Thank you for registering. Please use the following verification code
          to complete your registration:
        </Row>
        <Row>{otp}</Row>
        <Row>
          <Text>
            If you did not request this code, please ingnore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
