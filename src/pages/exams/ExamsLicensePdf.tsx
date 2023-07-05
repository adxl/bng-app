import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";

import { useAuth } from "../../hooks/auth";
import type { Attempt } from "../../typing/api/exams/attempts";
import type { Exam } from "../../typing/api/exams/exams";

type Props = {
  attempt: Attempt;
  exam: Exam;
};

const PDFView: React.FC = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { attempt, exam } = state as Props;

  if (user.id !== attempt.userId) navigate("/licenses");

  if (!attempt || !exam) navigate("/licenses");

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    borderPattern: {
      height: "90%",
      width: "90%",
      border: "1 solid #991B1B",
      backgroundColor: "#d6d6e4",
      margin: "auto",
      borderRadius: 20,
      borderWidth: 20,
    },

    heading: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      marginTop: 30,
      fontFamily: "Helvetica",
    },

    body: {
      textAlign: "center",
      fontSize: 18,
      marginTop: 140,
    },
  });

  const formatDate = (date: Date) => {
    date = new Date(date);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const CertificateLicense = () => (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={styles.borderPattern}>
          <View style={styles.heading}>
            <Text>
              Certificat de réussite pour le permis de véhicule de type : <Text style={{ fontWeight: "bold" }}>{exam.type?.name}</Text>
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={{ fontWeight: "bold" }}>
              {user.firstName} {user.lastName}{" "}
            </Text>
            <Text>à obtenu son permis le {formatDate(attempt.endedAt)}</Text>
            <Text>avec un résultat de {attempt.score}%</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <Link to={"/licenses"} className="z-50 relative my-4">
        <p className=" text-xl text-blue-600 dark:text-blue-500 mt-10">Retourner à la page des examens</p>
      </Link>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <CertificateLicense />
      </PDFViewer>
    </>
  );
};

export default PDFView;
