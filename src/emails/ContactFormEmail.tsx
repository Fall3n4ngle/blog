type Props = {
  name: string;
  email: string;
  content: string;
};

const ContactFormEmail: React.FC<Readonly<Props>> = ({
  name,
  email,
  content,
}) => (
  <div>
    <h1>Contact form submission</h1>
    <p>
      From <strong>{name}</strong> at {email}
    </p>
    <h2>Message:</h2>
    <p>{content}</p>
  </div>
);

export default ContactFormEmail;
