import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "../components/Link.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { OfferNotFound } from "../components/OfferNotFound.jsx";
import { DetailPageBreadCrumb } from "../components/DetailPageBreadCrumb.jsx";
import { DetailJobSection } from "../components/DetailJobSection.jsx";
import { DetailPageHeader } from "../components/DetailPageHeader.jsx";
import styles from "./Detail.module.css";

export default function DetailPage() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  if (loading) {
    return (
      <main>
        <LoadingSpinner text="Cargando empleo" />
      </main>
    );
  }

  if (error || !job) {
    return (
      <main>
        <OfferNotFound message="Oferta no encontrada" />
      </main>
    );
  }

  return (
    <>
      <main className={styles.container}>
        <DetailPageBreadCrumb job={job} />
        <DetailPageHeader job={job} />

        <DetailJobSection
          title="Descripción"
          content={job.content.description}
        />
        <DetailJobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <DetailJobSection
          title="Requisitos"
          content={job.content.requirements}
        />
        <DetailJobSection
          title="Acerca de la empresa"
          content={job.content.about}
        />
      </main>
    </>
  );
}
