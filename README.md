# Zero Trust Hackathon Website

This folder contains a simple static website for the **Bank of Baroda Zero&nbsp;Trust Hackathon**. The site includes:

* **Home page** (`index.html`) – Overview of the event, tracks and timeline.
* **Registration page** (`register.html`) – Collects participant details via a form.
* **Thank‑you page** (`thanks.html`) – Displays a confirmation message after successful registration.
* **Dashboard** (`dashboard.html`) – Visualises registration data (for organisers only).

## 📥 How to customise the registration form

By default the registration form posts submissions to [Formsubmit](https://formsubmit.co/) which is a free service that forwards form data to your email address. To receive registrations in your own inbox:

1. Replace `YOUR_EMAIL@example.com` in the `action` attribute of `register.html` with the email address where you want to receive submissions. For example:

   ```html
   <form action="https://formsubmit.co/youremail@domain.com" method="POST">
   ```

2. The hidden inputs within the form set the subject line and redirect URL. You can customise the `_subject` and `_next` values as desired.

3. When someone submits the form, Formsubmit will send you an email with all the fields. To prevent spam you may be asked to confirm your email the first time a submission is sent.

### Alternative integration using Google Forms

If you prefer to use a Google Form or another registration system:

1. Create a new form in Google Forms with the same fields (name, email, phone, organisation, LinkedIn and track).
2. Go to `Send` ➝ `Embed` in the form editor and copy the `<iframe>` embed code.
3. Replace the `<form>` element in `register.html` with the embed code. This will display the Google Form directly on your site. Responses will be stored in a Google Sheet automatically.

4. You can then use the `dashboard.html` page to visualise the data by linking it to the resulting Google Sheet (see below).

## 📊 Hooking up the dashboard

The dashboard reads data from a JSON file (`registrations.json`) and displays:

* Total number of registrations with a progress bar toward a target of 25 000.
* A bar chart showing the number of registrants per track.
* A table listing individual registrants.

To connect the dashboard to real data instead of the sample JSON:

1. **Export your registration data** from Google Sheets, Airtable or another database as a CSV or JSON file and host it alongside your site (for example, `registrations.csv` or `registrations.json`).

2. Modify the `fetch('registrations.json')` line in `js/dashboard.js` to point to your hosted file. If you use a CSV you can parse it using a library like [Papa Parse](https://www.papaparse.com/).

3. Deploy the updated site and the dashboard will automatically load the live data.

## 🚀 Deploying your site for free

There are several free services you can use to host this static website:

* **GitHub Pages** – Upload the contents of this folder to a public GitHub repository and enable GitHub Pages in the repository settings. The site will be served at `https://<your_username>.github.io/<repository>/`.
* **Netlify** – Drag and drop the folder onto [Netlify](https://www.netlify.com/) to deploy. Netlify forms can also collect submissions without needing Formsubmit.
* **Vercel** – Import the repository into [Vercel](https://vercel.com/) for automatic static deployment.

Once you have your Azure environment set up, you can also host these files on an Azure Storage account configured for static website hosting.

## 🔒 License and attribution

This website is provided as a template for organising the Bank of Baroda Zero Trust Hackathon. Feel free to modify the files, colours and content to suit your needs.