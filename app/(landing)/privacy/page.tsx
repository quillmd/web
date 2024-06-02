export default async function PrivacyPage() {

  return (
    <div className="font-garamond">
      <main className="flex flex-col items-center justify-start pt-24 px-6 md:px-0">
        <div className="max-w-3xl">
          <h1 className="text-4xl text-center font-bold mb-8">
            {`How Quill protects your privacy`}
          </h1>
          <p className="text-xl mb-12">
            {`Quill does NOT retain recordings of conversations between doctors
            and patients. Quill creates notes for physicians’ eyes only by
            compiling key data heard by Quill while the app is active.`}
          </p>
          <p className="text-xl mb-12">
            {`You can change your mind. You can opt out of your account at any
            time.`}
          </p>
          <p className="text-xl mb-12">
            {`We never sell data. We want to be clear on this point. We don’t have
            a business model that includes making money from selling your data.`}
          </p>
          <p className="text-xl mb-12">
            {`Anonymized Data is better. Any research and development is performed
            on de-identified health data or external data sets that are acquired
            with patient consent. If we have an opportunity to include your data
            in our research, we will request your consent before we do so.`}
          </p>
          <p className="text-xl mb-12">
            {`Data Security is not a trade-off. You trust us to keep your data
            secure and that guides everything we build. Because of that, we
            apply strict HIPAA security standards to all data we collect.`}
          </p>
        </div>
      </main>
    </div>
  );
}
