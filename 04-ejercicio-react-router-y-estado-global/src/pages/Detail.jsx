import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "../components/Link.jsx";

function DetailPageBreadCrumb({ job }) {
  return (
    <div>
      <nav>
        <Link>Empleos</Link>
        <span>/</span>
        <h2>{job.titulo}</h2>
      </nav>
    </div>
  );
}

export function DetailPage() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Job Not Found");
        return response.json();
      })
      .then((json) => {
        setJob(json);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (!job) {
    return "Cragando empleo...";
  }

  return (
    <>
      <main style={{ textAlign: "center" }}>
        <DetailPageBreadCrumb job={job} />
      </main>
    </>
  );
}
