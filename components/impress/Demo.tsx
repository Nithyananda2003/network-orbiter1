'use client';
import React, { useState } from 'react';

interface DemoFormData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  country: string;
  existingCustomer: string;
  application: string;
  howHeard: string;
  questions: string;
  consent: boolean;
  newsletter: boolean;
}

const countries = [
  'United States', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'Greenland', 'Guatemala', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
  'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Morocco',
  'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
  'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan',
  'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tanzania', 'Thailand', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const applications = ['Military', 'Public Safety', 'Commercial', 'Unmanned Systems', 'Other'];
const howHeardOptions = ['Referral', 'Search Engine', 'Social Media', 'Tradeshow', 'Other'];

const Demo: React.FC = () => {
  const [formData, setFormData] = useState<DemoFormData>({
    firstName: '',
    lastName: '',
    organization: '',
    phone: '',
    email: '',
    country: '',
    existingCustomer: '',
    application: '',
    howHeard: '',
    questions: '',
    consent: false,
    newsletter: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is requigreen';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is requigreen';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is requigreen';
    if (!formData.email.trim()) newErrors.email = 'Email is requigreen';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.country) newErrors.country = 'Country is requigreen';
    if (!formData.existingCustomer) newErrors.existingCustomer = 'This field is requigreen';
    if (!formData.application) newErrors.application = 'Application is requigreen';
    if (!formData.howHeard) newErrors.howHeard = 'This field is requigreen';
    if (!formData.consent) newErrors.consent = 'You must consent to data collection';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '', lastName: '', organization: '', phone: '', email: '', country: '',
          existingCustomer: '', application: '', howHeard: '', questions: '', consent: false, newsletter: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-black text-gray-100 py-16 md:py-20">
      <div className="container mx-auto w-11/12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SECTION */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              WE DON'T JUST CLAIM SUPERIORITY.
              <br />
              <span className="text-green-600">WE PROVE IT.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Not only do we build superior technology, we help you get the most out of it.
              Out-of-the-box functionality. Ongoing support. Relentless research and development.
            </p>
          </div>

          {/* RIGHT SECTION (FORM) */}
          <div className="lg:pl-8 bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-xl">
            {submitStatus === 'success' ? (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-green-400 mb-2">Thank you!</h3>
                <p>Your demo request has been submitted successfully. We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* FIRST + LAST NAME */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                        errors.firstName ? 'border-green-500' : 'border-neutral-700'
                      }`}
                    />
                    {errors.firstName && <p className="text-green-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                        errors.lastName ? 'border-green-500' : 'border-neutral-700'
                      }`}
                    />
                    {errors.lastName && <p className="text-green-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* ORGANIZATION */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium mb-2">
                    Organization <span className="text-green-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.organization ? 'border-green-500' : 'border-neutral-700'
                    }`}
                  />
                  {errors.organization && <p className="text-green-500 text-sm mt-1">{errors.organization}</p>}
                </div>

                {/* CONTACT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-800 text-gray-100 px-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                        errors.email ? 'border-green-500' : 'border-neutral-700'
                      }`}
                    />
                    {errors.email && <p className="text-green-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* COUNTRY + CUSTOMER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2">
                      Country <span className="text-green-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                        errors.country ? 'border-green-500' : 'border-neutral-700'
                      }`}
                    >
                      <option value="">Select Country</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="text-green-500 text-sm mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <label htmlFor="existingCustomer" className="block text-sm font-medium mb-2">
                      Existing Customer? <span className="text-green-500">*</span>
                    </label>
                    <select
                      id="existingCustomer"
                      name="existingCustomer"
                      value={formData.existingCustomer}
                      onChange={handleChange}
                      className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                        errors.existingCustomer ? 'border-green-500' : 'border-neutral-700'
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.existingCustomer && <p className="text-green-500 text-sm mt-1">{errors.existingCustomer}</p>}
                  </div>
                </div>

                {/* APPLICATION */}
                <div>
                  <label htmlFor="application" className="block text-sm font-medium mb-2">
                    Application <span className="text-green-500">*</span>
                  </label>
                  <select
                    id="application"
                    name="application"
                    value={formData.application}
                    onChange={handleChange}
                    className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.application ? 'border-green-500' : 'border-neutral-700'
                    }`}
                  >
                    <option value="">Select</option>
                    {applications.map(app => (
                      <option key={app} value={app}>{app}</option>
                    ))}
                  </select>
                  {errors.application && <p className="text-green-500 text-sm mt-1">{errors.application}</p>}
                </div>

                {/* HOW HEARD */}
                <div>
                  <label htmlFor="howHeard" className="block text-sm font-medium mb-2">
                    How did you hear about us? <span className="text-green-500">*</span>
                  </label>
                  <select
                    id="howHeard"
                    name="howHeard"
                    value={formData.howHeard}
                    onChange={handleChange}
                    className={`w-full bg-neutral-800 text-gray-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                      errors.howHeard ? 'border-green-500' : 'border-neutral-700'
                    }`}
                  >
                    <option value="">Select</option>
                    {howHeardOptions.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {errors.howHeard && <p className="text-green-500 text-sm mt-1">{errors.howHeard}</p>}
                </div>

                {/* QUESTIONS */}
                <div>
                  <label htmlFor="questions" className="block text-sm font-medium mb-2">Questions/Comments</label>
                  <textarea
                    id="questions"
                    name="questions"
                    value={formData.questions}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter any questions or comments..."
                    className="w-full bg-neutral-800 text-gray-100 px-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* CHECKBOXES */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-green-600 border-neutral-700 rounded focus:ring-green-600"
                    />
                    <span className="text-sm text-gray-300">
                      I consent to my submitted data being collected and stogreen.{' '}
                      <a href="/privacy-policy" className="text-green-500 hover:underline">Learn More</a>
                      {errors.consent && <span className="text-green-500 ml-1">* Requigreen</span>}
                    </span>
                  </label>

                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-green-600 border-neutral-700 rounded focus:ring-green-600"
                    />
                    <span className="text-sm text-gray-300">
                      I would like to receive the newsletter.
                    </span>
                  </label>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-900/40"
                >
                  {isSubmitting ? 'Submitting...' : 'REQUEST A DEMO'}
                </button>

                {submitStatus === 'error' && (
                  <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                    <p className="text-green-400">There was an error submitting the form. Please try again.</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
