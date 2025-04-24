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
];

export const iitAndMissedHeaders = defaultStatHeaders;
iitAndMissedHeaders.splice(5, 0, {
  name: "Next appointment date",
  selector: "appointmentDate",
});

export const iitHeaders = [...iitAndMissedHeaders];
iitHeaders.splice(5, 0, {
  name: "Date Became IIT",
  selector: "dateClientBecameIIT",
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

export const uanHeaders = [...ageHeaders];
uanHeaders.splice(4, 0, {
  name: "UAN",
  selector: "uan",
});

export const chwHeaders = [...uanHeaders];
chwHeaders.splice(11, 0, {
  name: "CHW Name",
  selector: "chwName",
});

export const appointmentHeaders = [...chwHeaders];
appointmentHeaders.splice(12, 0, {
  name: "CHW Telephone Number",
  selector: "chwTelephoneNumber",
});

export const vlDueHeaders = [...appointmentHeaders];
vlDueHeaders.splice(6, 0, {
  name: "Date VL due",
  selector: "vlDueDate",
});
