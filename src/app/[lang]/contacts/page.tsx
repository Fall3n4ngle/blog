import FeedbackFormCard from "@/components/FeedbackFormCard";
import { sendEmail } from "@/lib/actions/sendEmail";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Locale } from "@/lib/i18n/i18n-config";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Contacts({ params: { lang } }: Props) {
  const {
    contacts: { contactForm },
  } = await getDictionary(lang);

  const action = async (data: FormData) => {
    "use server";

    return await sendEmail(data);
  };

  return (
    <div className="secondary-container">
      <FeedbackFormCard action={action} dictionary={contactForm} />
    </div>
  );
}
