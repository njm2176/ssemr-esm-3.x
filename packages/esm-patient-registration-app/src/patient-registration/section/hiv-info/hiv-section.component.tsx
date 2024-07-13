import React, { useContext, useEffect } from "react";
import styles from "./../section.scss";
import { useField } from "formik";
import { PatientRegistrationContext } from "../../patient-registration-context";
import { Field } from "../../field/field.component";

export interface HIVSectionProps {
  fields: Array<string>;
}

export const HIVSection: React.FC<HIVSectionProps> = ({
  fields,
}) => {
  const [field, meta] = useField("addNameInLocalLanguage");
  const { setFieldValue } = useContext(PatientRegistrationContext);


  return (
    <section className={styles.formSection} aria-label="HIV Section">
      {fields.map((field) => (
        <Field key={`hiv-${field}`} name={field} />
      ))}
    </section>
  );
};
