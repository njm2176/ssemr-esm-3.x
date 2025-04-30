import { TableCell, Tag } from "@carbon/react";
import Link from "@carbon/react/lib/components/UIShell/Link";
import React, { useEffect, useState } from "react";
import usePatientData from "../hooks/usePatientData";

// const VlEligibilityCell = ({ patientUuid }) => {
//   const [dueForVl, setDueForVl] = useState(false);
//   const { flags } = usePatientData(patientUuid);

//   useEffect(() => {
//     if (flags?.includes("DUE_FOR_VL")) {
//       setDueForVl(true);
//     } else {
//       setDueForVl(false);
//     }
//   }, [flags]);

//   return (
//     <TableCell size="sm">
//       <Tag size="md" type={dueForVl ? "green" : "red"}>
//         {dueForVl ? "Eligible" : "Not eligible"}
//       </Tag>
//     </TableCell>
//   );
// };

export const defaultStatHeaders = [
  {
    name: "SN",
    cell: (row) => <TableCell>{row.serial}</TableCell>,
  },
  {
    name: "Name",
    selector: "name",
    cell: (row) => (
      <TableCell>
        <Link
          href={`${window.getOpenmrsSpaBase()}patient/${
            row?.uuid
          }/chart/Patient%20Summary`}
        >
          {row.name}
        </Link>
      </TableCell>
    ),
  },
  {
    name: "UAN",
    selector: "uan",
    cell: (row) => (
      <TableCell>{row.identifiers?.[0]?.identifier || "N/A"}</TableCell>
    ),
  },
  {
    name: "Sex",
    selector: "sex",
  },
  {
    name: "Date enrolled",
    selector: "dateEnrolled",
  },
  {
    name: "Last refill date",
    selector: "lastRefillDate",
  },
  {
    name: "Contact",
    selector: "contact",
  },
  {
    name: "CHW Name",
    selector: "chwName",
  },
  {
    name: "CHW Phone",
    selector: "chwPhone",
  },
  {
    name: "Village",
    selector: "village",
    cell: (row) => (
      <TableCell>
        <p className="">{row.address.split(",")[0].split(":")[1]}</p>
      </TableCell>
    ),
  },
  {
    name: "Landmark",
    selector: "landMark",
    cell: (row) => (
      <TableCell>
        <p className="">{row.address.split(",")[1].split(":")[1]}</p>
      </TableCell>
    ),
  },
  {
    name: "Date of 1st Attempt",
    selector: "",
  },
  {
    name: "Date of 2nd Attempt",
    selector: "",
  },
  {
    name: "Date of 3rd Attempt",
    selector: "",
  },
  {
    name: "(1=Refilled,2=Transferred Out,3=Died,4=Not Reachable,5=Others(specify))",
    selector: "",
  },
];

export const iitAndMissedHeaders = defaultStatHeaders;
iitAndMissedHeaders.splice(5, 0, {
  name: "Next appointment date",
  selector: "appointmentDate",
});

// export const txCURRHeaders = [
//   ...iitAndMissedHeaders,
//   {
//     name: "Eligible for VL",
//     selector: "dueForVl",
//     cell: (row) => <VlEligibilityCell patientUuid={row.uuid} />, // Use the new component here
//   },
// ];

export const rttHeaders = [...defaultStatHeaders];
rttHeaders.splice(4, 0, {
  name: "Date returned to treatment",
  selector: "dateReturnedToTreatment",
  cell: (row) => (
    <TableCell size="sm">
      <span>
        {row?.dateReturnedToTreatment ? row.dateReturnedToTreatment : "---"}
      </span>
    </TableCell>
  ),
});

export const ageHeaders = [...defaultStatHeaders];
ageHeaders.splice(2, 0, {
  name: "Age",
  selector: "age",
});

export const chwHeaders = [...ageHeaders];

export const appointmentHeaders = [...chwHeaders];

export const vlDueHeaders = [...appointmentHeaders];
vlDueHeaders.splice(8, 0, {
  name: "Date VL due",
  selector: "vlDueDate",
});

export const iitHeaders = [...appointmentHeaders];
iitHeaders.splice(7, 0, {
  name: "Date Became IIT",
  selector: "dateClientBecameIIT",
});
