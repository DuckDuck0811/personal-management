import { useEffect, useMemo, useState } from "react";

type TicketStatus = "active" | "expired" | "inactive";

type Ticket = {
  id: string;
  personId: string;
  ticketId: string;
  fullName: string;
  citizenId?: string;
  phone: string;
  organization: string;
  contactUnit: string;
  type: string;
  officerCode: string;
  vehicle?: string;
  status: TicketStatus;
  validTo: string;
  createdAt: string;
  accessDates: string[];
};

type PersonGroup = {
  key: string;
  citizenId?: string;
  tickets: Ticket[];
};

const tickets: Ticket[] = [
  {
    id: "rec-0060",
    personId: "person-linh",
    ticketId: "TICKET-20260722-0060",
    fullName: "Hoàng Bảo Linh",
    citizenId: "900000123478",
    phone: "0912 345 678",
    organization: "Công ty TNHH Kỹ Thuật Việt",
    contactUnit: "Phòng Quản trị hệ thống",
    type: "Khách bộ ngành",
    officerCode: "NV045",
    vehicle: "30F-67890",
    status: "active",
    validTo: "25/09/2026",
    createdAt: "22/07/2026",
    accessDates: ["2026-07-22","2026-07-23","2026-07-28","2026-07-30","2026-08-01","2026-08-04","2026-08-06","2026-08-11","2026-08-13","2026-08-18","2026-08-20","2026-08-25","2026-08-27","2026-09-01","2026-09-03","2026-09-08","2026-09-10","2026-09-15","2026-09-17","2026-09-22","2026-09-23","2026-09-24","2026-09-25"],
  },
  {
    id: "rec-0052",
    personId: "person-linh",
    ticketId: "TICKET-20260618-0052",
    fullName: "Hoàng Bảo Linh",
    citizenId: "900000123478",
    phone: "0912 345 678",
    organization: "Công ty TNHH Kỹ Thuật Việt",
    contactUnit: "Phòng Hạ tầng CNTT",
    type: "Khách bộ ngành",
    officerCode: "NV045",
    vehicle: "30F-67890",
    status: "expired",
    validTo: "20/06/2026",
    createdAt: "18/06/2026",
    accessDates: ["2026-09-22", "2026-09-23", "2026-10-02"],
  },
  {
    id: "rec-0047",
    personId: "person-linh",
    ticketId: "TICKET-20260502-0047",
    fullName: "Hoàng Bảo Linh",
    citizenId: "900000123478",
    phone: "0912 345 678",
    organization: "Công ty TNHH Kỹ Thuật Việt",
    contactUnit: "Phòng Quản trị hệ thống",
    type: "Khách bộ ngành",
    officerCode: "NV045",
    status: "expired",
    validTo: "04/05/2026",
    createdAt: "02/05/2026",
    accessDates: ["2026-09-24", "2026-09-28"],
  },
  ...[
    ["0077", "2026-10-12", "2026-10-15", "2026-10-12", "2026-10-14"],
    ["0076", "2026-10-01", "2026-10-04", "2026-10-01", "2026-10-03"],
    ["0075", "2026-09-18", "2026-09-21", "2026-09-18", "2026-09-20"],
    ["0074", "2026-09-11", "2026-09-14", "2026-09-11", "2026-09-13"],
    ["0073", "2026-09-04", "2026-09-07", "2026-09-04", "2026-09-06"],
    ["0072", "2026-08-21", "2026-08-24", "2026-08-21", "2026-08-23"],
    ["0070", "2026-08-14", "2026-08-17", "2026-08-14", "2026-08-16"],
    ["0069", "2026-08-07", "2026-08-10", "2026-08-07", "2026-08-09"],
    ["0068", "2026-07-24", "2026-07-27", "2026-07-24", "2026-07-26"],
    ["0067", "2026-07-17", "2026-07-20", "2026-07-17", "2026-07-19"],
    ["0066", "2026-07-10", "2026-07-13", "2026-07-10", "2026-07-12"],
    ["0065", "2026-07-03", "2026-07-06", "2026-07-03", "2026-07-05"],
    ["0064", "2026-06-26", "2026-06-29", "2026-06-26", "2026-06-28"],
    ["0063", "2026-06-19", "2026-06-22", "2026-06-19", "2026-06-21"],
    ["0062", "2026-06-12", "2026-06-15", "2026-06-12", "2026-06-14"],
    ["0061", "2026-06-05", "2026-06-08", "2026-06-05", "2026-06-07"],
    ["0059", "2026-05-22", "2026-05-25", "2026-05-22", "2026-05-24"],
  ].map(([sequence, createdIso, validToIso, accessStart, accessEnd]) => {
    const [createdYear, createdMonth, createdDay] = createdIso.split("-");
    const [validYear, validMonth, validDay] = validToIso.split("-");
    const recordNumber = Number(sequence);
    return {
      id: `rec-${sequence}`,
      personId: "person-linh",
      ticketId: `TICKET-${createdYear}${createdMonth}${createdDay}-${sequence}`,
      fullName: "Hoàng Bảo Linh",
      citizenId: "900000123478",
      phone: "0912 345 678",
      organization: "Công ty TNHH Kỹ Thuật Việt",
      contactUnit:
        recordNumber % 2 ? "Phòng Quản trị hệ thống" : "Phòng Hạ tầng CNTT",
      type: "Khách bộ ngành",
      officerCode: "NV045",
      vehicle: "30F-67890",
      status: "expired" as const,
      validTo: `${validDay}/${validMonth}/${validYear}`,
      createdAt: `${createdDay}/${createdMonth}/${createdYear}`,
      accessDates: [accessStart, accessEnd],
    };
  }),
  {
    id: "rec-0071",
    personId: "person-minh",
    ticketId: "TICKET-20260805-0071",
    fullName: "Nguyễn Hoàng Minh",
    citizenId: "001088012345",
    phone: "0988 120 345",
    organization: "Trung tâm Dữ liệu Quốc gia",
    contactUnit: "Ban An toàn thông tin",
    type: "Cán bộ hợp đồng / dự án",
    officerCode: "CB128",
    vehicle: "29A-812.45",
    status: "active",
    validTo: "31/12/2026",
    createdAt: "05/08/2026",
    accessDates: ["2026-09-07", "2026-09-08", "2026-09-15", "2026-09-22"],
  },
  {
    id: "rec-0039",
    personId: "person-minh",
    ticketId: "TICKET-20260410-0039",
    fullName: "Nguyễn Hoàng Minh",
    citizenId: "001088012345",
    phone: "0988 120 345",
    organization: "Trung tâm Dữ liệu Quốc gia",
    contactUnit: "Ban An toàn thông tin",
    type: "Cán bộ hợp đồng / dự án",
    officerCode: "CB128",
    vehicle: "29A-812.45",
    status: "inactive",
    validTo: "12/04/2026",
    createdAt: "10/04/2026",
    accessDates: ["2026-09-08", "2026-09-15"],
  },
  {
    id: "rec-0084",
    personId: "person-thao",
    ticketId: "TICKET-20260826-0084",
    fullName: "Trần Thu Thảo",
    citizenId: "038196004821",
    phone: "0904 886 122",
    organization: "Công ty Cổ phần Hạ tầng Số",
    contactUnit: "Phòng Vận hành",
    type: "Khách VIP",
    officerCode: "KT092",
    status: "active",
    validTo: "30/09/2026",
    createdAt: "26/08/2026",
    accessDates: ["2026-09-03", "2026-09-10", "2026-09-17"],
  },
  {
    id: "rec-0089",
    personId: "person-an",
    ticketId: "TICKET-20260901-0089",
    fullName: "Lê Đức An",
    phone: "0936 118 920",
    organization: "Đơn vị dịch vụ kỹ thuật",
    contactUnit: "Phòng Giám sát",
    type: "Hậu cần chung",
    officerCode: "DV031",
    status: "active",
    validTo: "03/09/2026",
    createdAt: "01/09/2026",
    accessDates: ["2026-09-01", "2026-09-02", "2026-09-03"],
  },
  {
    id: "rec-0090",
    personId: "person-nam",
    ticketId: "TICKET-20260901-0090",
    fullName: "Phạm Thành Nam",
    phone: "0968 221 630",
    organization: "Đơn vị dịch vụ kỹ thuật",
    contactUnit: "Phòng Giám sát",
    type: "Hậu cần chung",
    officerCode: "DV044",
    status: "active",
    validTo: "03/09/2026",
    createdAt: "01/09/2026",
    accessDates: ["2026-09-01", "2026-09-03"],
  },
  {
    id: "rec-0091",
    personId: "person-one-day",
    ticketId: "TICKET-20261022-0091",
    fullName: "Trần Gia Bảo",
    citizenId: "079000000091",
    phone: "0900 000 091",
    organization: "Công ty TNHH Dữ liệu Việt",
    contactUnit: "Phòng Hạ tầng CNTT",
    type: "Khách bộ ngành",
    officerCode: "NV091",
    vehicle: "30G-12345",
    status: "active",
    validTo: "22/10/2026",
    createdAt: "22/10/2026",
    accessDates: ["2026-10-22"],
  },
].map((ticket): Ticket =>
  ticket.personId === "person-linh"
    ? ({
        ...ticket,
        accessDates: Array.from(new Set([...ticket.accessDates, "2026-09-22"])),
      } as Ticket)
    : (ticket as Ticket),
);

const icons = {
  users: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  ),
  user: (
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
  ),
  idCard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M6 10h4M6 14h8M16 10h2" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </>
  ),
  building2: (
    <>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM2 22h20" />
      <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  car: (
    <>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3.3C2 11.5 2 11.8 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  alert: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 4v5h5" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 20v-5h-5" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </>
  ),
  expand: (
    <>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </>
  ),
  collapse: (
    <>
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  filter: <path d="M4 4h16l-6 7v6l-4 2v-8L4 4Z" />,
  clear: (
    <>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5" />
    </>
  ),
  ticket: (
    <>
      <path d="M2 9a3 3 0 0 0 0 6v4h20v-4a3 3 0 0 0 0-6V5H2v4Z" />
      <path d="M13 5v2M13 11v2M13 17v2" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
};

function Icon({
  name,
  size = 18,
}: {
  name: keyof typeof icons;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function groupTickets(items: Ticket[]): PersonGroup[] {
  const groups = new Map<string, PersonGroup>();
  items.forEach((ticket) => {
    // Missing citizen IDs are intentionally isolated by record ID to avoid merging people.
    const normalizedCitizenId = ticket.citizenId?.replace(/\s/g, "");
    const key = normalizedCitizenId
      ? `cccd:${normalizedCitizenId}`
      : `record:${ticket.id}`;
    const group = groups.get(key);
    if (group) group.tickets.push(ticket);
    else
      groups.set(key, {
        key,
        citizenId: normalizedCitizenId,
        tickets: [ticket],
      });
  });
  return Array.from(groups.values()).map((group) => ({
    ...group,
    tickets: [...group.tickets].sort((a, b) =>
      b.createdAt.split("/").reverse().join("").localeCompare(
        a.createdAt.split("/").reverse().join(""),
      ),
    ),
  }));
}

function sharedValue(group: PersonGroup, field: keyof Ticket) {
  const values = [
    ...new Set(
      group.tickets
        .map((ticket) => String(ticket[field] || "").trim())
        .filter(Boolean),
    ),
  ];
  if (!values.length) return { value: "—", conflict: false };
  return values.length === 1
    ? { value: values[0], conflict: false }
    : { value: "Có nhiều giá trị", conflict: true };
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(-2)
    .map((word) => word[0])
    .join("");
}

function formatCalendarDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

const statusLabel: Record<TicketStatus, string> = {
  active: "Đang hiệu lực",
  expired: "Hết hạn",
  inactive: "Không hoạt động",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["cccd:900000123478"]),
  );
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [detailMode, setDetailMode] = useState<"person" | "ticket">("person");
  const [expandedTicketIds, setExpandedTicketIds] = useState<Set<string>>(new Set());
  const [calendarMonth, setCalendarMonth] = useState("2026-09");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState("2026-09-22");
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAllScheduleDates, setShowAllScheduleDates] = useState(false);
  const pageSize = 4;

  useEffect(() => {
    document.documentElement.style.overflow = selected ? "hidden" : "";
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filteredTickets = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("vi");
    return tickets.filter((ticket) => {
      const searchable = [
        ticket.fullName,
        ticket.citizenId,
        ticket.phone,
        ticket.organization,
        ticket.ticketId,
        ticket.officerCode,
      ]
        .join(" ")
        .toLocaleLowerCase("vi");
      const [day, month, year] = ticket.createdAt.split("/");
      const createdAt = `${year}-${month}-${day}`;
      return (
        (!needle || searchable.includes(needle)) &&
        (!type || ticket.type === type) &&
        (!status || ticket.status === status) &&
        (!dateFrom || createdAt >= dateFrom) &&
        (!dateTo || createdAt <= dateTo)
      );
    });
  }, [query, type, status, dateFrom, dateTo]);

  const groups = useMemo(
    () => groupTickets(filteredTickets),
    [filteredTickets],
  );
  const pages = Math.max(1, Math.ceil(groups.length / pageSize));
  const visibleGroups = groups.slice((page - 1) * pageSize, page * pageSize);
  const selectedPersonTickets = useMemo(
    () =>
      selected
        ? tickets
            .filter((ticket) => ticket.personId === selected.personId)
            .sort((a, b) =>
              b.createdAt.split("/").reverse().join("-").localeCompare(
                a.createdAt.split("/").reverse().join("-"),
              ),
            )
        : [],
    [selected],
  );

  const personVehicles = useMemo(() => {
    if (selected?.personId === "person-linh") {
      return [
        { plate: "30A-12345", type: "—", createdAt: "06/10/2026" },
        { plate: "30F-67890", type: "—", createdAt: "24/09/2026" },
        { plate: "51A-12345", type: "Car", createdAt: "05/08/2026" },
      ];
    }
    const byPlate = new Map<string, { plate: string; type: string; createdAt: string }>();
    selectedPersonTickets.forEach((ticket) => {
      if (ticket.vehicle && !byPlate.has(ticket.vehicle)) {
        byPlate.set(ticket.vehicle, { plate: ticket.vehicle, type: "—", createdAt: ticket.createdAt });
      }
    });
    return Array.from(byPlate.values());
  }, [selected, selectedPersonTickets]);

  const profileExtras = selected?.personId === "person-linh"
    ? { gender: "Nữ", birthDate: "12/05/1988", purpose: "Bảo trì hệ thống mạng", note: "Liên hệ cán bộ phụ trách khi đến", registeredAt: "21/07/2026" }
    : selected?.personId === "person-one-day"
      ? { gender: "Nam", birthDate: "10/08/1994", purpose: "Bảo trì thiết bị mạng", note: "Liên hệ anh Bảo trước khi vào khu vực làm việc", registeredAt: "22/10/2026" }
    : { gender: "Chưa cập nhật", birthDate: "Chưa cập nhật", purpose: "Chưa cập nhật", note: "Chưa có ghi chú", registeredAt: "Chưa cập nhật" };

  const personAccessHistory = useMemo(
    () =>
      selectedPersonTickets
        .flatMap((ticket) =>
          ticket.accessDates.map((date, index) => ({ ticket, date, index })),
        )
        .sort((a, b) => b.date.localeCompare(a.date)),
    [selectedPersonTickets],
  );

  const ticketsByAccessDate = useMemo(() => {
    const grouped = new Map<string, Ticket[]>();
    selectedPersonTickets.forEach((ticket) => ticket.accessDates.forEach((date) => {
      grouped.set(date, [...(grouped.get(date) || []), ticket]);
    }));
    return grouped;
  }, [selectedPersonTickets]);
  const selectedDayTickets = ticketsByAccessDate.get(selectedCalendarDate) || [];
  const calendarDays = useMemo(() => {
    const [year, month] = calendarMonth.split("-").map(Number);
    const mondayOffset = (new Date(year, month - 1, 1).getDay() + 6) % 7;
    const totalDays = new Date(year, month, 0).getDate();
    return [
      ...Array.from({ length: mondayOffset }, () => null),
      ...Array.from({ length: totalDays }, (_, index) => `${year}-${String(month).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`),
    ];
  }, [calendarMonth]);

  function openTicket(ticket: Ticket) {
    setSelected(ticket);
    setDetailMode("ticket");
    setExpandedTicketIds(new Set([ticket.id]));
    setShowAllScheduleDates(false);
    const firstAccessDate = ticket.accessDates[0] || "2026-09-01";
    setSelectedCalendarDate(firstAccessDate);
    setCalendarMonth(firstAccessDate.slice(0, 7));
  }

  function openPersonProfile(ticket: Ticket) {
    setSelected(ticket);
    setDetailMode("person");
    setExpandedTicketIds(new Set());
  }

  function changeCalendarMonth(offset: number) {
    const [year, month] = calendarMonth.split("-").map(Number);
    const next = new Date(year, month - 1 + offset, 1);
    setCalendarMonth(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`);
  }

  function toggleGroup(key: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function resetFilters() {
    setQuery("");
    setType("");
    setStatus("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  }

  function refresh() {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 650);
  }

  function exportCsv() {
    const columns = [
      "id",
      "ticket_id",
      "ho_ten",
      "cccd",
      "dien_thoai",
      "don_vi",
      "trang_thai",
      "hieu_luc_den",
    ];
    const rows = filteredTickets.map((ticket) => [
      ticket.id,
      ticket.ticketId,
      ticket.fullName,
      ticket.citizenId || "",
      ticket.phone,
      ticket.organization,
      statusLabel[ticket.status],
      ticket.validTo,
    ]);
    const csv = [columns, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }),
    );
    link.download = "danh-sach-ca-nhan.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="app-shell">
      <main>
        <header className="topbar">
          <div className="breadcrumb">
            <span>Quản lý</span>
            <b>/</b>
            <strong>Cá nhân</strong>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Thông báo">
              <span className="notification-dot" />
              <Icon name="bell" size={17} />
            </button>
            <div className="avatar small">QT</div>
          </div>
        </header>

        <div className="page">
          <section className="page-heading">
            <div>
              <h1>Quản lý cá nhân</h1>
              <p>Quản lý danh sách hồ sơ cá nhân và các phiếu đăng ký làm việc theo số định danh CCCD</p>
            </div>
            <div className="heading-actions">
              <button className="button secondary" onClick={refresh}>
                <span className={isRefreshing ? "spin" : ""}>
                  <Icon name="refresh" size={17} />
                </span>
                Làm mới
              </button>
              <button className="button primary" onClick={exportCsv}>
                <Icon name="download" size={17} />
                Xuất dữ liệu
              </button>
            </div>
          </section>

          <section className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Icon name="users" size={24} />
              </div>
              <div className="stat-meta">
                <span>TỔNG SỐ CÁ NHÂN</span>
                <strong>{groupTickets(tickets).length}</strong>
                <small>Được gom nhóm theo số CCCD</small>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon violet">
                <Icon name="ticket" size={24} />
              </div>
              <div className="stat-meta">
                <span>TỔNG SỐ PHIẾU</span>
                <strong>{tickets.length}</strong>
                <small>
                  {tickets.filter((item) => item.status === "active").length}{" "}
                  phiếu đang hiệu lực
                </small>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber">
                <Icon name="filter" size={24} />
              </div>
              <div className="stat-meta">
                <span>KẾT QUẢ HIỂN THỊ</span>
                <strong>{groups.length}</strong>
                <small>{filteredTickets.length} phiếu làm việc phù hợp</small>
              </div>
            </div>
          </section>

          <section className="filter-card">
            <div className="filter-heading">
              <div className="filter-title">
                <div className="filter-icon-pill">
                  <Icon name="filter" size={16} />
                </div>
                <strong>Bộ lọc tìm kiếm</strong>
              </div>
              {(query || type || status || dateFrom || dateTo) && (
                <button className="text-button" onClick={resetFilters}>
                  <Icon name="clear" size={16} />
                  Xóa bộ lọc
                </button>
              )}
            </div>
            <div className="filter-grid">
              <label className="search-field">
                <span>Tìm kiếm</span>
                <div>
                  <Icon name="search" size={17} />
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Họ tên, CCCD, mã phiếu..."
                  />
                </div>
              </label>
              <label>
                <span>Loại cá nhân</span>
                <select
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Tất cả loại</option>
                  {[...new Set(tickets.map((ticket) => ticket.type))].map(
                    (item) => (
                      <option key={item}>{item}</option>
                    ),
                  )}
                </select>
              </label>
              <label>
                <span>Trạng thái phiếu</span>
                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="active">Đang hiệu lực</option>
                  <option value="expired">Hết hạn</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </label>
              <label>
                <span>Từ ngày</span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => {
                    setDateFrom(event.target.value);
                    setPage(1);
                  }}
                  aria-label="Từ ngày"
                />
              </label>
              <label>
                <span>Đến ngày</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(event) => {
                    setDateTo(event.target.value);
                    setPage(1);
                  }}
                  aria-label="Đến ngày"
                />
              </label>
            </div>
          </section>

          <section className="results-card">
            <div className="results-toolbar">
              <div className="results-toolbar-title">
                <strong>Danh sách cá nhân</strong>
                <span>
                  Hiển thị <b>{groups.length}</b> cá nhân · <b>{filteredTickets.length}</b> phiếu làm việc
                </span>
              </div>
            </div>

            {isRefreshing && <div className="loading-bar" />}

            {visibleGroups.length ? (
              <div className="group-list">
                <div className="parent-table-header">
                  <span className="col-header col-expand" />
                  <div className="col-header col-name">
                    <Icon name="user" size={15} />
                    <span>HỌ VÀ TÊN</span>
                  </div>
                  <div className="col-header col-cccd">
                    <Icon name="idCard" size={15} />
                    <span>SỐ CCCD</span>
                  </div>
                  <div className="col-header col-phone">
                    <Icon name="phone" size={15} />
                    <span>SỐ ĐIỆN THOẠI</span>
                  </div>
                  <div className="col-header col-org">
                    <Icon name="building" size={15} />
                    <span>ĐƠN VỊ CÔNG TÁC</span>
                  </div>
                  <div className="col-header col-unit">
                    <Icon name="building2" size={15} />
                    <span>ĐƠN VỊ LIÊN LẠC</span>
                  </div>
                  <div className="col-header col-action">
                    <Icon name="gear" size={15} />
                    <span>THAO TÁC</span>
                  </div>
                </div>
                {visibleGroups.map((group) => {
                  const isOpen = expanded.has(group.key);
                  const name = sharedValue(group, "fullName");
                  const phone = sharedValue(group, "phone");
                  const organization = sharedValue(group, "organization");
                  const contactUnit = sharedValue(group, "contactUnit");
                  return (
                    <article
                      className={`person-group ${isOpen ? "open" : ""}`}
                      key={group.key}
                    >
                      <div
                        className="parent-row"
                        onClick={() => toggleGroup(group.key)}
                      >
                        <div className="cell-expand">
                          <button
                            className="chevron-button"
                            aria-label={isOpen ? "Thu gọn nhóm" : "Mở rộng nhóm"}
                            aria-expanded={isOpen}
                          >
                            <Icon name="chevron" size={18} />
                          </button>
                        </div>
                        <div className="person-cell">
                          <div className="avatar">
                            {initials(group.tickets[0].fullName)}
                          </div>
                          <div className="person-meta">
                            <strong>{name.value}</strong>
                            <span>{group.tickets.length} phiếu làm việc</span>
                          </div>
                        </div>
                        <div className="cell-cccd">
                          <code className={`cccd-badge ${!group.citizenId ? "empty" : ""}`}>
                            {group.citizenId || "Chưa có CCCD"}
                          </code>
                        </div>
                        <div className="cell-phone">
                          <span className="phone-text">{phone.value}</span>
                        </div>
                        <div className="cell-org">
                          {organization.conflict ? (
                            <span className="conflict-badge" title={organization.value}>
                              <Icon name="alert" size={14} />
                              <span>Nhiều đơn vị</span>
                            </span>
                          ) : (
                            <span className="unit-text">{organization.value}</span>
                          )}
                        </div>
                        <div className="cell-unit">
                          {contactUnit.conflict ? (
                            <span className="conflict-badge" title={contactUnit.value}>
                              <Icon name="alert" size={14} />
                              <span>Nhiều phòng ban</span>
                            </span>
                          ) : (
                            <span className="unit-text">{contactUnit.value}</span>
                          )}
                        </div>
                        <div className="cell-action">
                          <button
                            className="view-button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openPersonProfile(group.tickets[0]);
                            }}
                          >
                            <Icon name="eye" size={16} />
                            <span>Hồ sơ</span>
                          </button>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="ticket-panel">
                          <div className="ticket-panel-heading">
                            <div>
                              <Icon name="ticket" size={18} />
                              <strong>Danh sách phiếu làm việc</strong>
                              <span className="ticket-count-badge">{group.tickets.length}</span>
                            </div>
                            <small>Mỗi dòng là một bản ghi phiếu độc lập</small>
                          </div>
                          <div className="ticket-table-wrap">
                            <table>
                              <thead>
                                <tr>
                                  <th>
                                    <div className="th-inner">
                                      <Icon name="ticket" size={14} />
                                      <span>MÃ PHIẾU</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <span>ẢNH</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <Icon name="user" size={14} />
                                      <span>HỌ VÀ TÊN</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <span>LOẠI</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <span>MÃ NV</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <Icon name="car" size={14} />
                                      <span>PHƯƠNG TIỆN</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <span>TRẠNG THÁI / HIỆU LỰC</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <Icon name="calendar" size={14} />
                                      <span>NGÀY TẠO</span>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="th-inner">
                                      <span>THAO TÁC</span>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {group.tickets.map((ticket) => (
                                  <tr key={ticket.id}>
                                    <td>
                                      <button
                                        className="ticket-link"
                                        onClick={() => openTicket(ticket)}
                                      >
                                        {ticket.ticketId}
                                      </button>
                                      <small>ID: {ticket.id}</small>
                                    </td>
                                    <td>
                                      <div className="avatar ticket-avatar">
                                        {initials(ticket.fullName)}
                                      </div>
                                    </td>
                                    <td>
                                      <strong>{ticket.fullName}</strong>
                                      <small>
                                        {ticket.citizenId || "Chưa có CCCD"}
                                      </small>
                                    </td>
                                    <td>
                                      <span className="type-chip">
                                        {ticket.type}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="officer-code">{ticket.officerCode || "—"}</span>
                                    </td>
                                    <td>
                                      {ticket.vehicle ? (
                                        <code className="plate">
                                          {ticket.vehicle}
                                        </code>
                                      ) : (
                                        <span className="text-muted">—</span>
                                      )}
                                    </td>
                                    <td>
                                      <span
                                        className={`status ${ticket.status}`}
                                      >
                                        <i />
                                        {statusLabel[ticket.status]}
                                      </span>
                                      <small className="valid-to-text">Đến {ticket.validTo}</small>
                                    </td>
                                    <td>
                                      <span className="date-created">{ticket.createdAt}</span>
                                    </td>
                                    <td>
                                      <button
                                        className="icon-button table-action"
                                        onClick={() => openTicket(ticket)}
                                        aria-label={`Xem ${ticket.ticketId}`}
                                        title={`Xem chi tiết ${ticket.ticketId}`}
                                      >
                                        <Icon name="eye" size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <div>
                  <Icon name="search" size={28} />
                </div>
                <strong>Không tìm thấy cá nhân</strong>
                <p>Thử thay đổi từ khóa hoặc xóa các bộ lọc đang áp dụng.</p>
                <button className="button secondary" onClick={resetFilters}>
                  Xóa bộ lọc
                </button>
              </div>
            )}

            <div className="pagination">
              <span>
                Hiển thị {visibleGroups.length} / {groups.length} cá nhân
              </span>
              <div>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((value) => value - 1)}
                >
                  ‹
                </button>
                {Array.from({ length: pages }, (_, index) => index + 1).map(
                  (value) => (
                    <button
                      className={value === page ? "current" : ""}
                      key={value}
                      onClick={() => setPage(value)}
                    >
                      {value}
                    </button>
                  ),
                )}
                <button
                  disabled={page === pages}
                  onClick={() => setPage((value) => value + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {selected && (
        <section className="ticket-detail-page" aria-label="Chi tiết phiếu">
          <div className="detail-page-inner">
            <div className="detail-page-heading">
              <button
                className="detail-back-button"
                onClick={() => {
                  if (detailMode === "ticket") setDetailMode("person");
                  else setSelected(null);
                }}
              >
                <span>←</span>
                {detailMode === "ticket" ? "Quay lại hồ sơ cá nhân" : "Quay lại danh sách"}
              </button>
              <div>
                <h1>{detailMode === "ticket" ? "Chi tiết phiếu" : "Hồ sơ cá nhân"}</h1>
                <p>{detailMode === "ticket" ? `Thông tin riêng của phiếu ${selected.ticketId}` : `Lịch sử ra vào của ${selected.fullName}`}</p>
              </div>
            </div>

            <div className="detail-layout">
              <div className="profile-sidebar-column">
              <aside className="profile-card">
                <div className="detail-card-title basic-info-title">
                  <div><Icon name="user" size={18} /><strong>Thông tin cơ bản cá nhân</strong></div>
                </div>
                <div className="profile-identity">
                  <span className="profile-kind">HỒ SƠ KHÁCH</span>
                  <div className="profile-avatar">
                    {initials(selected.fullName)}
                  </div>
                  <h2>{selected.fullName}</h2>
                  <span className="profile-role">{selected.type}</span>
                  {detailMode === "ticket" && <span className={`status ${selected.status}`}><i />{statusLabel[selected.status]}</span>}
                </div>
                <dl className="profile-info">
                  <div>
                    <dt>CCCD</dt>
                    <dd>{selected.citizenId || "Chưa có CCCD"}</dd>
                  </div>
                  <div>
                    <dt>Số điện thoại</dt>
                    <dd>{selected.phone}</dd>
                  </div>
                  <div>
                    <dt>Loại</dt>
                    <dd>
                      <span className="type-chip">{selected.type}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Mã nhân viên</dt>
                    <dd>{selected.officerCode}</dd>
                  </div>
                  <div>
                    <dt>Đơn vị công tác</dt>
                    <dd>{selected.organization}</dd>
                  </div>
                  <div>
                    <dt>Đơn vị liên lạc</dt>
                    <dd>{selected.contactUnit}</dd>
                  </div>
                  <div>
                    <dt>Giới tính</dt>
                    <dd>{profileExtras.gender}</dd>
                  </div>
                  <div>
                    <dt>Ngày sinh</dt>
                    <dd>{profileExtras.birthDate}</dd>
                  </div>
                </dl>
              </aside>
              </div>

              <div className="detail-main-column">
                {detailMode === "person" ? (
                  <>
                  <section className="detail-card person-tickets-card">
                    <div className="detail-card-title">
                      <div><Icon name="ticket" size={18} /><strong>Thẻ đăng ký</strong><b>{selectedPersonTickets.length}</b></div>
                      <small>Ba phiếu gần nhất hiển thị trước; cuộn để xem các phiếu còn lại</small>
                    </div>
                    <div className="person-ticket-overview-list">
                      {selectedPersonTickets.map((ticket) => (
                        <button className="person-ticket-overview" key={ticket.id} onClick={() => openTicket(ticket)}>
                          <span className="ticket-trigger-icon"><Icon name="ticket" size={17} /></span>
                          <span className="person-ticket-overview-main"><strong>{ticket.ticketId}</strong><small>Từ ngày {ticket.createdAt} đến ngày {ticket.validTo}</small><span className="person-ticket-date-preview">{ticket.accessDates.slice(0, 2).map((date) => <i key={date}>{formatCalendarDate(date)}</i>)}</span></span>
                          <span className={`status ${ticket.status}`}><i />{statusLabel[ticket.status]}</span>
                          <span className="ticket-open-label">Xem chi tiết →</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="detail-card person-history-card">
                    <div className="detail-card-title">
                      <div><Icon name="calendar" size={18} /><strong>Lịch sử ra vào</strong><b>{personAccessHistory.length}</b></div>
                      <small>Lịch sử ra vào của {selected.fullName}</small>
                    </div>
                    <div className="person-history-table-wrap">
                      <table className="person-history-table">
                        <thead><tr><th>THỜI GIAN</th><th>HỆ THỐNG</th><th>THIẾT BỊ</th><th>KHU VỰC</th><th>HƯỚNG</th><th>XÁC THỰC</th><th>KẾT QUẢ</th></tr></thead>
                        <tbody>
                          {personAccessHistory.map(({ ticket, date, index }) => (
                            <tr key={`${ticket.id}-${date}-${index}`}>
                              <td>{index % 2 === 0 ? "08:02:14" : "16:58:06"} {formatCalendarDate(date)}</td>
                              <td><span className="system-chip">ACS</span></td>
                              <td>{index % 2 === 0 ? "Cửa 200.1" : "Cửa 201.1"}</td>
                              <td>{index % 2 === 0 ? "DC1.A.N.2.KT" : "DC1.A.N.FT.HC"}</td>
                              <td>{index % 2 === 0 ? <span className="direction-in">↪ Vào</span> : <span className="direction-out">↩ Ra</span>}</td>
                              <td>Khuôn mặt</td>
                              <td><span className="result-granted">Thành công</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  </>
                ) : (
                <section className={`person-ticket-selector ${detailMode === "ticket" ? "ticket-detail-shell" : ""}`} aria-label="Chi tiết phiếu đang xem">
                  <div className="person-ticket-selector-heading">
                    <div><strong>Thẻ đăng ký</strong><span>{selected.ticketId}</span></div>
                    <small>Thông tin và lịch sử chỉ thuộc phiếu đang xem</small>
                  </div>
                  <div className={`person-ticket-list ${detailMode === "ticket" ? "ticket-single-view" : ""}`}>
                    {selectedPersonTickets.filter((ticket) => ticket.id === selected.id).map((ticket) => {
                      const isExpanded = expandedTicketIds.has(ticket.id);
                      return (
                        <article className={`person-ticket-accordion ${isExpanded ? "expanded" : ""}`} key={ticket.id}>
                          <button
                            className="person-ticket-trigger"
                            aria-expanded={isExpanded}
                            onClick={() => {
                              setSelected(ticket);
                              setExpandedTicketIds((current) => {
                                const next = new Set(current);
                                if (next.has(ticket.id)) next.delete(ticket.id);
                                else next.add(ticket.id);
                                return next;
                              });
                            }}
                          >
                            <span className="ticket-trigger-icon"><Icon name="ticket" size={17} /></span>
                            <span className="ticket-trigger-main"><strong>{ticket.ticketId}</strong><small>Từ ngày {ticket.createdAt} đến ngày {ticket.validTo}</small></span>
                            <span className={`status ${ticket.status}`}><i />{statusLabel[ticket.status]}</span>
                            <span className="ticket-trigger-chevron">⌄</span>
                          </button>
                          {isExpanded && (
                            <div className="person-ticket-expanded-content">
                              <div className="ticket-card-title"><div className="ticket-card-title-label"><Icon name="user" size={23} /><strong>Thẻ Đăng ký</strong></div><span className="ticket-card-validity">Từ ngày {ticket.createdAt} đến ngày {ticket.validTo}</span></div>
                              <section className="ticket-work-information">
                                <div className="ticket-work-information-heading"><Icon name="calendar" size={16} /><strong>THÔNG TIN LỊCH LÀM VIỆC</strong></div>
                                <div className="ticket-work-information-grid">
                                  <div><span>Mục đích</span><strong>{profileExtras.purpose}</strong></div>
                                  <div><span>Ngày đăng ký</span><strong>{profileExtras.registeredAt}</strong></div>
                                  <div className="work-note"><span>Ghi chú</span><strong>{profileExtras.note}</strong></div>
                                  <div className="work-area"><span>Khu vực làm việc</span><strong>{ticket.contactUnit}</strong><small>{ticket.organization}</small></div>
                                </div>
                              </section>
                              <section className="ticket-registration-schedule">
                                <div className="ticket-registration-heading"><div><Icon name="calendar" size={16} /><strong>LỊCH RA VÀO</strong></div></div>
                                <div className="ticket-registration-days">
                                  {[...ticket.accessDates].sort().map((date) => (
                                    <article className="ticket-registration-day" key={date}>
                                      <div className="ticket-registration-date"><Icon name="calendar" size={15} /><strong>{formatCalendarDate(date)}</strong></div>
                                      <span className="ticket-registration-time">00:00 - 23:59</span>
                                      <small>Thời hạn hiệu lực: Từ ngày {ticket.createdAt} đến ngày {ticket.validTo}</small>
                                    </article>
                                  ))}
                                </div>
                              </section>
                              <section className="ticket-rack-section">
                                <div className="ticket-resource-grid">
                                  <section className="ticket-resource-panel">
                                    <header className="ticket-resource-heading">
                                      <div><span className="resource-symbol cage-symbol">▦</span><strong>LỒNG RACK</strong><b>1</b></div>
                                      <span>XEM TẤT CẢ (1)</span>
                                    </header>
                                    <article className="ticket-rack-item">
                                      <span className="rack-icon cage-rack-icon">▣</span>
                                      <div><strong>CAGE-A</strong><small>Lồng máy chủ khu A</small></div>
                                      <code>ⓘ</code>
                                    </article>
                                  </section>
                                  <section className="ticket-resource-panel">
                                    <header className="ticket-resource-heading">
                                      <div><span className="resource-symbol rack-symbol">▤</span><strong>TỦ RACK</strong><b>1</b></div>
                                      <span>XEM TẤT CẢ (1)</span>
                                    </header>
                                    <article className="ticket-rack-item">
                                      <span className="rack-icon rack-resource-icon">▤</span>
                                      <div><strong>SIM-GRANT-1</strong><small>Khu vực được cấp quyền · {ticket.contactUnit}</small></div>
                                      <code>ⓘ</code>
                                    </article>
                                  </section>
                                </div>
                              </section>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
                )}

                <section className="detail-card registration-card">
                  <div className="detail-card-title">
                    <div className="title-with-icon">
                      <div className="card-title-icon">
                        <Icon name="ticket" size={20} />
                      </div>
                      <strong>Lịch đăng ký của cá nhân</strong>
                    </div>
                    <span className="ticket-context">
                      {selectedPersonTickets.length} phiếu làm việc
                    </span>
                  </div>

                  <div className="detail-card-content">
                    <div className="detail-section-label">
                      <Icon name="calendar" size={16} />
                      <span>LỊCH RA VÀO THEO THÁNG</span>
                    </div>
                    <div className="calendar-schedule-layout">
                      <div className="access-calendar">
                        <div className="calendar-toolbar">
                          <button
                            className="cal-nav-btn"
                            aria-label="Tháng trước"
                            onClick={() => changeCalendarMonth(-1)}
                          >
                            ‹
                          </button>
                          <input
                            className="calendar-month-picker"
                            type="month"
                            value={calendarMonth}
                            aria-label="Chọn tháng xem lịch ra vào"
                            onChange={(event) => {
                              const month = event.target.value;
                              if (!month) return;
                              setCalendarMonth(month);
                              setSelectedCalendarDate(`${month}-01`);
                            }}
                          />
                          <button
                            className="cal-nav-btn"
                            aria-label="Tháng sau"
                            onClick={() => changeCalendarMonth(1)}
                          >
                            ›
                          </button>
                        </div>
                        <div className="calendar-weekdays">
                          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(
                            (day) => (
                              <span key={day} className={day === "T7" || day === "CN" ? "weekend" : ""}>
                                {day}
                              </span>
                            ),
                          )}
                        </div>
                        <div className="calendar-grid">
                          {calendarDays.map((date, index) =>
                            date ? (
                              <button
                                key={date}
                                className={[
                                  "cal-day-btn",
                                  date === selectedCalendarDate
                                    ? "selected"
                                    : "",
                                  ticketsByAccessDate.has(date)
                                    ? "has-tickets"
                                    : "",
                                ].join(" ")}
                                onClick={() => setSelectedCalendarDate(date)}
                                aria-label={`${formatCalendarDate(date)}${
                                  ticketsByAccessDate.has(date)
                                    ? `, ${ticketsByAccessDate.get(date)?.length} phiếu`
                                    : ""
                                }`}
                              >
                                <span className="day-number">{Number(date.slice(-2))}</span>
                                {ticketsByAccessDate.has(date) && (
                                  <span className="day-badge-dot">
                                    <span className="dot" />
                                    {(ticketsByAccessDate.get(date)?.length ||
                                      0) > 1 && (
                                      <span className="count-pill">
                                        {ticketsByAccessDate.get(date)?.length}
                                      </span>
                                    )}
                                  </span>
                                )}
                              </button>
                            ) : (
                              <span
                                className="calendar-empty-day"
                                key={`empty-${index}`}
                              />
                            ),
                          )}
                        </div>
                        <div className="calendar-legend">
                          <div className="legend-indicator">
                            <span className="dot-active" />
                            <span>Ngày có phiếu</span>
                          </div>
                          <small>Chọn ngày để xem chi tiết phiếu</small>
                        </div>
                      </div>

                      <div className="day-ticket-panel">
                        <div className="day-ticket-heading">
                          <div>
                            <span className="sub-title">CHI TIẾT PHIẾU TRONG NGÀY</span>
                            <strong className="main-date">
                              {formatCalendarDate(selectedCalendarDate)}
                            </strong>
                          </div>
                          <div className="day-count-badge">
                            <b>{selectedDayTickets.length}</b> phiếu
                          </div>
                        </div>
                        {selectedDayTickets.length ? (
                          <div className="day-ticket-list">
                            {selectedDayTickets.map((ticket, index) => (
                              <button
                                key={ticket.id}
                                className={`day-ticket-item ${
                                  ticket.id === selected.id ? "current" : ""
                                }`}
                                onClick={() => setSelected(ticket)}
                              >
                                <div className="day-ticket-topline">
                                  <span className={`status ${ticket.status}`}>
                                    <i />
                                    {statusLabel[ticket.status]}
                                  </span>
                                  {ticket.id === selected.id ? (
                                    <span className="viewing-pill">Đang xem</span>
                                  ) : (
                                    <span className="click-view-hint">Xem chi tiết</span>
                                  )}
                                </div>
                                <div className="day-ticket-body">
                                  <div className="ticket-id-row">
                                    <Icon name="ticket" size={16} />
                                    <strong>{ticket.ticketId}</strong>
                                  </div>
                                  <div className="ticket-time-row">
                                    <span>🕒</span>
                                    <span>
                                      {index % 2 === 0
                                        ? "08:00 – 11:30 · 13:30 – 17:00"
                                        : "09:00 – 12:00 · 14:00 – 16:30"}
                                    </span>
                                  </div>
                                  <div className="ticket-unit-row">
                                    <span>🏢</span>
                                    <small>
                                      {ticket.contactUnit} · Mã NV: <b>{ticket.officerCode}</b>
                                    </small>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="day-ticket-empty">
                            <div className="day-ticket-empty-icon">
                              <Icon name="calendar" size={32} />
                            </div>
                            <strong>Không có phiếu trong ngày</strong>
                            <p>
                              Ngày <b>{formatCalendarDate(selectedCalendarDate)}</b> không có lịch làm việc đăng ký.
                            </p>
                            <div className="empty-hint">
                              <span className="dot-hint" />
                              <span>Hãy chọn các ngày có chấm xanh trên lịch</span>
                            </div>
                            {ticketsByAccessDate.size > 0 && (
                              <button
                                className="btn-select-active-date"
                                onClick={() => {
                                  const dates = Array.from(ticketsByAccessDate.keys()).sort();
                                  if (dates[0]) {
                                    setSelectedCalendarDate(dates[0]);
                                    setCalendarMonth(dates[0].slice(0, 7));
                                  }
                                }}
                              >
                                <Icon name="ticket" size={15} />
                                Chuyển đến ngày có phiếu ({formatCalendarDate(Array.from(ticketsByAccessDate.keys()).sort()[0])})
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="registration-resource">
                      <div className="detail-section-label">
                        <span>▦</span>
                        KHU VỰC & TỦ RACK
                        <b>2</b>
                      </div>
                      <div className="resource-list">
                        <div className="resource-item">
                          <span className="resource-icon">▦</span>
                          <div>
                            <strong>RACK-001</strong>
                            <small>Rack Server Core 01</small>
                          </div>
                          <span>DC01.B09.09.VP1-01</span>
                        </div>
                        <div className="resource-item">
                          <span className="resource-icon cage">◇</span>
                          <div>
                            <strong>CAGE-A</strong>
                            <small>Lồng máy chủ khu A</small>
                          </div>
                          <span>DC01.B09.09.VP1-01</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="detail-card access-card">
                  <div className="detail-card-title">
                    <div>
                      <span className="history-icon">↶</span>
                      <strong>Lịch sử ra vào</strong>
                      <b>3</b>
                    </div>
                    <button className="text-link">
                      Xem tất cả <span>↗</span>
                    </button>
                  </div>
                  <div className="access-table-wrap">
                    <table className="access-table">
                      <thead>
                        <tr>
                          <th>THỜI GIAN</th>
                          <th>PHÂN HỆ</th>
                          <th>THIẾT BỊ</th>
                          <th>KHU VỰC</th>
                          <th>HƯỚNG</th>
                          <th>XÁC THỰC</th>
                          <th>KẾT QUẢ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>13:27:39 03/09/2026</td>
                          <td>
                            <span className="system-chip">ACS</span>
                          </td>
                          <td>Cổng cây đèn</td>
                          <td>DC1.A</td>
                          <td>
                            <span className="direction-in">↪</span>
                          </td>
                          <td>Khuôn mặt</td>
                          <td>
                            <span className="result-granted">Thành công</span>
                          </td>
                        </tr>
                        <tr>
                          <td>20:04:10 26/08/2026</td>
                          <td>
                            <span className="system-chip">ACS</span>
                          </td>
                          <td>Cửa 200.2</td>
                          <td>DC1.A.N.2.DA1</td>
                          <td>
                            <span className="direction-in">↪</span>
                          </td>
                          <td>Khuôn mặt</td>
                          <td>
                            <span className="result-granted">Thành công</span>
                          </td>
                        </tr>
                        <tr>
                          <td>08:12:05 26/08/2026</td>
                          <td>
                            <span className="system-chip">ACS</span>
                          </td>
                          <td>Sảnh chính</td>
                          <td>DC1.A</td>
                          <td>
                            <span className="direction-out">↩</span>
                          </td>
                          <td>Thẻ</td>
                          <td>
                            <span className="result-granted">Thành công</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <div className="detail-record-note">
                  <Icon name="ticket" />
                  <p>
                    Toàn bộ lịch đăng ký, rack, khu vực và trạng thái trên màn
                    hình này thuộc riêng phiếu{" "}
                    <strong>{selected.ticketId}</strong>. Phiếu được truy cập
                    bằng ID bản ghi <strong>{selected.id}</strong>.
                  </p>
                </div>
              </div>
            </div>
            <section className="detail-card person-vehicles-card profile-vehicles-full">
              <div className="detail-card-title">
                <div><Icon name="car" size={18} /><strong>Phương tiện</strong><b>{detailMode === "person" ? personVehicles.length : selected.vehicle ? 1 : 0}</b></div>
              </div>
              <div className="vehicle-table-wrap">
                <table className="vehicle-table">
                  <thead><tr><th>Biển số xe</th><th>Loại</th><th>Trạng thái</th><th>Ngày tạo</th></tr></thead>
                  <tbody>
                    {detailMode === "person" ? (
                      personVehicles.length ? personVehicles.map((vehicle) => (
                        <tr key={vehicle.plate}><td><strong>{vehicle.plate}</strong></td><td>{vehicle.type}</td><td><span className="vehicle-registered">Hoạt động</span></td><td>{vehicle.createdAt}</td></tr>
                      )) : <tr><td colSpan={4} className="vehicle-empty">Chưa đăng ký phương tiện</td></tr>
                    ) : selected.vehicle ? (
                      <tr><td><strong>{selected.vehicle}</strong></td><td>—</td><td><span className="vehicle-registered">Hoạt động</span></td><td>{selected.createdAt}</td></tr>
                    ) : <tr><td colSpan={4} className="vehicle-empty">Phiếu này chưa đăng ký phương tiện</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
            </div>
        </section>
      )}
    </div>
  );
}
