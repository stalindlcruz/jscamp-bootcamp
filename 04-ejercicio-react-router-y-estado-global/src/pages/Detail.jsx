import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "../components/Link.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { OfferNotFound } from "../components/OfferNotFound.jsx";
import { useAuthStore } from "../store/authStore";
import { useFavoriteStore } from "../store/favoriteStore";

import styles from "./Detail.module.css";
import snarkdown from "snarkdown";

function DetailPageBreadCrumb({ job }) {
  return (
    <div>
      <nav className={styles.navContainer}>
        <Link className={styles.jobLink} to={"/search"}>
          Empleos
        </Link>
        <span>/</span>
        <h3>{job.titulo}</h3>
      </nav>
    </div>
  );
}

function DetailApplyBtn() {
  const { isLoggedIn } = useAuthStore();

  return (
    <button disabled={!isLoggedIn}>
      {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
    </button>
  );
}

function DetailFavoriteBtn({ jobId }) {
  const { toggleFavorites, isFavorite } = useFavoriteStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <button
      // className={""}
      disabled={!isLoggedIn}
      onClick={() => toggleFavorites(jobId)}
    >
      {isFavorite(jobId) ? "❤️" : "♡"}
    </button>
  );
}

function DetailPageHeader({ job }) {
  return (
    <header className={styles.detailHeader}>
      <div className={styles.containerTitle}>
        <h2>{job.titulo}</h2>
        <p>
          {job.empresa} • {job.ubicacion}
        </p>
      </div>

      <div className={styles.containerBtns}>
        <DetailApplyBtn />
        <DetailFavoriteBtn jobId={job.id} />
      </div>
    </header>
  );
}

function JobSection({ title, content }) {
  const htmlContent = snarkdown(content);

  return (
    <section className={styles.jobSection}>
      <h2>{title}</h2>
      <div
        className={`prose`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}

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

        <JobSection title="Descripción" content={job.content.description} />
        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </main>
    </>
  );
}
