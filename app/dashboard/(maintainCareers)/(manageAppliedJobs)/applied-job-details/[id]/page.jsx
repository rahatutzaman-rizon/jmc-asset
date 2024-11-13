// app/job/[id]/page.js
import { notFound } from 'next/navigation';

// Fetch job application details based on id
async function fetchApplicationDetails(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/job/application/${id}`,
      {
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch application data");
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching application details:", error);
    return null;
  }
}

// Generate static params for all job IDs
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/api/job/list`
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch job list");
    }
    
    const data = await res.json();
    
    return data.jobs.map((job) => ({
      id: job._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Page Component
export default async function JobDetailsPage({ params }) {
  const applicationData = await fetchApplicationDetails(params.id);

  if (!applicationData) {
    notFound();
  }

  const {
    full_name,
    email,
    mobile,
    address,
    resume,
    status,
    created_at,
    job,
  } = applicationData;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Applicant Information</h2>
        <p><strong>Name:</strong> {full_name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Mobile:</strong> {mobile}</p>
        <p><strong>Address:</strong> {address}</p>
        <p>
          <strong>Resume:</strong>{" "}
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL_JMC_TECHNOLOGY}/${resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Resume
          </a>
        </p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Applied on:</strong> {new Date(created_at).toLocaleString()}</p>
      </div>
      
      <div className="bg-gray-100 shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">Job Information</h2>
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Responsibilities:</strong> {job.job_responsibilities}</p>
        <p><strong>Vacancy Count:</strong> {job.vacancy_count}</p>
        <p><strong>Educational Requirements:</strong> {job.educational_requirements}</p>
        <p><strong>Experience Requirements:</strong> {job.experience_requirements} years</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p>
          <strong>Application Deadline:</strong>{" "}
          {new Date(job.application_deadline).toLocaleString()}
        </p>
        <p><strong>Status:</strong> {job.status}</p>
      </div>
    </section>
  );
}