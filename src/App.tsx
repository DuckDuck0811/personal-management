import { useEffect, useMemo, useState } from "react"

type TicketStatus = "active" | "expired" | "inactive"

type Ticket = {
  id: string
  personId: string
  ticketId: string
  fullName: string
  citizenId?: string
  phone: string
  organization: string
  contactUnit: string
  type: string
  officerCode: string
  vehicle?: string
  status: TicketStatus
  validTo: string
  createdAt: string
  accessDates: string[]
}

type PersonGroup = {
  key: string
  citizenId?: string
  tickets: Ticket[]
}

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
    accessDates: ["2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25"],
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
    const [createdYear, createdMonth, createdDay] = createdIso.split("-")
    const [validYear, validMonth, validDay] = validToIso.split("-")
    const recordNumber = Number(sequence)
    return {
      id: `rec-${sequence}`,
      personId: "person-linh",
      ticketId: `TICKET-${createdYear}${createdMonth}${createdDay}-${sequence}`,
      fullName: "HoÃ ng Báº£o Linh",
      citizenId: "900000123478",
      phone: "0912 345 678",
      organization: "CÃ´ng ty TNHH Ká»¹ Thuáº­t Viá»‡t",
      contactUnit: recordNumber % 2
        ? "PhÃ²ng Quáº£n trá»‹ há»‡ thá»‘ng"
        : "PhÃ²ng Háº¡ táº§ng CNTT",
      type: "KhÃ¡ch bá»™ ngÃ nh",
      officerCode: "NV045",
      vehicle: "30F-67890",
      status: "expired" as const,
      validTo: `${validDay}/${validMonth}/${validYear}`,
      createdAt: `${createdDay}/${createdMonth}/${createdYear}`,
      accessDates: [accessStart, accessEnd],
    }
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
]

const icons = {
  users: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
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
}

function Icon({ name, size = 18 }: { name: keyof typeof icons; size?: number }) {
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
  )
}

function groupTickets(items: Ticket[]): PersonGroup[] {
  const groups = new Map<string, PersonGroup>()
  items.forEach((ticket) => {
    // Missing citizen IDs are intentionally isolated by record ID to avoid merging people.
    const normalizedCitizenId = ticket.citizenId?.replace(/\s/g, "")
    const key = normalizedCitizenId
      ? `cccd:${normalizedCitizenId}`
      : `record:${ticket.id}`
    const group = groups.get(key)
    if (group) group.tickets.push(ticket)
    else
      groups.set(key, {
        key,
        citizenId: normalizedCitizenId,
        tickets: [ticket],
      })
  })
  return Array.from(groups.values())
}

function sharedValue(group: PersonGroup, field: keyof Ticket) {
  const values = [
    ...new Set(
      group.tickets
        .map((ticket) => String(ticket[field] || "").trim())
        .filter(Boolean),
    ),
  ]
  if (!values.length) return { value: "—", conflict: false }
  return values.length === 1
    ? { value: values[0], conflict: false }
    : { value: "Có nhiều giá trị", conflict: true }
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(-2)
    .map((word) => word[0])
    .join("")
}

function formatCalendarDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-")
  return `${day}/${month}/${year}`
}

const statusLabel: Record<TicketStatus, string> = {
  active: "Đang hiệu lực",
  expired: "Hết hạn",
  inactive: "Không hoạt động",
}

export default function App() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["cccd:900000123478"]),
  )
  const [selected, setSelected] = useState<Ticket | null>(null)
  const [calendarMonth, setCalendarMonth] = useState("2026-09")
  const [selectedCalendarDate, setSelectedCalendarDate] = useState("2026-09-22")
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const pageSize = 4

  useEffect(() => {
    document.documentElement.style.overflow = selected ? "hidden" : ""
    document.body.style.overflow = selected ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [selected])

  const filteredTickets = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("vi")
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
        .toLocaleLowerCase("vi")
      const [day, month, year] = ticket.createdAt.split("/")
      const createdAt = `${year}-${month}-${day}`
      return (
        (!needle || searchable.includes(needle)) &&
        (!type || ticket.type === type) &&
        (!status || ticket.status === status) &&
        (!dateFrom || createdAt >= dateFrom) &&
        (!dateTo || createdAt <= dateTo)
      )
    })
  }, [query, type, status, dateFrom, dateTo])

  const groups = useMemo(() => groupTickets(filteredTickets), [filteredTickets])
  const pages = Math.max(1, Math.ceil(groups.length / pageSize))
  const visibleGroups = groups.slice((page - 1) * pageSize, page * pageSize)
  const selectedPersonTickets = useMemo(
    () =>
      selected
        ? tickets.filter((ticket) => ticket.personId === selected.personId)
        : [],
    [selected],
  )

  const ticketsByAccessDate = useMemo(() => {
    const grouped = new Map<string, Ticket[]>()
    selectedPersonTickets.forEach((ticket) => {
      ticket.accessDates.forEach((date) => {
        grouped.set(date, [...(grouped.get(date) || []), ticket])
      })
    })
    return grouped
  }, [selectedPersonTickets])

  const calendarDays = useMemo(() => {
    const [year, month] = calendarMonth.split("-").map(Number)
    const firstDay = new Date(year, month - 1, 1)
    const totalDays = new Date(year, month, 0).getDate()
    const mondayOffset = (firstDay.getDay() + 6) % 7
    return [
      ...Array.from({ length: mondayOffset }, () => null),
      ...Array.from({ length: totalDays }, (_, index) => {
        const day = index + 1
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      }),
    ]
  }, [calendarMonth])

  const selectedDayTickets =
    ticketsByAccessDate.get(selectedCalendarDate) || []

  function openTicket(ticket: Ticket) {
    const firstAccessDate = ticket.accessDates[0] || "2026-09-01"
    setSelected(ticket)
    setSelectedCalendarDate(firstAccessDate)
    setCalendarMonth(firstAccessDate.slice(0, 7))
  }

  function changeCalendarMonth(offset: number) {
    const [year, month] = calendarMonth.split("-").map(Number)
    const next = new Date(year, month - 1 + offset, 1)
    setCalendarMonth(
      `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`,
    )
  }

  function toggleGroup(key: string) {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function resetFilters() {
    setQuery("")
    setType("")
    setStatus("")
    setDateFrom("")
    setDateTo("")
    setPage(1)
  }

  function refresh() {
    setIsRefreshing(true)
    window.setTimeout(() => setIsRefreshing(false), 650)
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
    ]
    const rows = filteredTickets.map((ticket) => [
      ticket.id,
      ticket.ticketId,
      ticket.fullName,
      ticket.citizenId || "",
      ticket.phone,
      ticket.organization,
      statusLabel[ticket.status],
      ticket.validTo,
    ])
    const csv = [columns, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
      )
      .join("\n")
    const link = document.createElement("a")
    link.href = URL.createObjectURL(
      new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }),
    )
    link.download = "danh-sach-ca-nhan.csv"
    link.click()
    URL.revokeObjectURL(link.href)
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
              <span className="notification-dot" />♢
            </button>
            <div className="avatar small">QT</div>
          </div>
        </header>

        <div className="page">
          <section className="page-heading">
            <div>
              <h1>Quản lý cá nhân</h1>
              <p>Quản lý hồ sơ cá nhân và các phiếu làm việc theo CCCD</p>
            </div>
            <div className="heading-actions">
              <button className="button secondary" onClick={refresh}>
                <span className={isRefreshing ? "spin" : ""}>
                  <Icon name="refresh" />
                </span>
                Làm mới
              </button>
              <button className="button primary" onClick={exportCsv}>
                <Icon name="download" />
                Xuất dữ liệu
              </button>
            </div>
          </section>

          <section className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Icon name="users" size={22} />
              </div>
              <div>
                <span>Tổng số cá nhân</span>
                <strong>{groupTickets(tickets).length}</strong>
                <small>Được gom nhóm theo CCCD</small>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon violet">
                <Icon name="ticket" size={22} />
              </div>
              <div>
                <span>Tổng số phiếu</span>
                <strong>{tickets.length}</strong>
                <small>
                  {tickets.filter((item) => item.status === "active").length}{" "}
                  phiếu đang hiệu lực
                </small>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber">
                <Icon name="filter" size={22} />
              </div>
              <div>
                <span>Kết quả hiển thị</span>
                <strong>{groups.length}</strong>
                <small>{filteredTickets.length} phiếu phù hợp</small>
              </div>
            </div>
          </section>

          <section className="filter-card">
            <div className="filter-heading">
              <div>
                <Icon name="filter" />
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
                  <Icon name="search" />
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setPage(1)
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
                    setType(event.target.value)
                    setPage(1)
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
                    setStatus(event.target.value)
                    setPage(1)
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
                    setDateFrom(event.target.value)
                    setPage(1)
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
                    setDateTo(event.target.value)
                    setPage(1)
                  }}
                  aria-label="Đến ngày"
                />
              </label>
            </div>
          </section>

          <section className="results-card">
            <div className="results-toolbar">
              <div>
                <strong>Danh sách cá nhân</strong>
                <span>
                  {groups.length} cá nhân · {filteredTickets.length} phiếu
                </span>
              </div>

            </div>

            {isRefreshing && <div className="loading-bar" />}

            {visibleGroups.length ? (
              <div className="group-list">
                <div className="parent-table-header">
                  <span />
                  <span>HỌ VÀ TÊN</span>
                  <span>CCCD</span>
                  <span>SỐ ĐIỆN THOẠI</span>
                  <span>ĐƠN VỊ CÔNG TÁC</span>
                  <span>ĐƠN VỊ LIÊN LẠC</span>
                  <span>THAO TÁC</span>
                </div>
                {visibleGroups.map((group) => {
                  const isOpen = expanded.has(group.key)
                  const name = sharedValue(group, "fullName")
                  const phone = sharedValue(group, "phone")
                  const organization = sharedValue(group, "organization")
                  const contactUnit = sharedValue(group, "contactUnit")
                  return (
                    <article
                      className={`person-group ${isOpen ? "open" : ""}`}
                      key={group.key}
                    >
                      <div
                        className="parent-row"
                        onClick={() => toggleGroup(group.key)}
                      >
                        <button
                          className="chevron-button"
                          aria-label={isOpen ? "Thu gọn nhóm" : "Mở rộng nhóm"}
                          aria-expanded={isOpen}
                        >
                          <Icon name="chevron" />
                        </button>
                        <div className="person-cell">
                          <div className="avatar">
                            {initials(group.tickets[0].fullName)}
                          </div>
                          <div>
                            <strong>{name.value}</strong>
                            <span>{group.tickets.length} phiếu làm việc</span>
                          </div>
                        </div>
                        <code>{group.citizenId || "Chưa có CCCD"}</code>
                        <span>{phone.value}</span>
                        <span
                          className={organization.conflict ? "conflict" : ""}
                        >
                          {organization.value}
                        </span>
                        <span
                          className={contactUnit.conflict ? "conflict" : ""}
                        >
                          {contactUnit.value}
                        </span>
                        <button
                          className="view-button"
                          onClick={(event) => {
                            event.stopPropagation()
                            openTicket(group.tickets[0])
                          }}
                        >
                          <Icon name="eye" size={17} />
                          Hồ sơ
                        </button>
                      </div>

                      {isOpen && (
                        <div className="ticket-panel">
                          <div className="ticket-panel-heading">
                            <div>
                              <Icon name="ticket" />
                              <strong>Phiếu làm việc</strong>
                              <span>{group.tickets.length}</span>
                            </div>
                            <small>Mỗi dòng là một bản ghi độc lập</small>
                          </div>
                          <div className="ticket-table-wrap">
                            <table>
                              <thead>
                                <tr>
                                  <th>MÃ PHIẾU</th>
                                  <th>ẢNH</th>
                                  <th>HỌ VÀ TÊN</th>
                                  <th>LOẠI</th>
                                  <th>MÃ NV</th>
                                  <th>PHƯƠNG TIỆN</th>
                                  <th>TRẠNG THÁI / HIỆU LỰC</th>
                                  <th>NGÀY TẠO</th>
                                  <th />
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
                                    <td>{ticket.officerCode || "—"}</td>
                                    <td>
                                      {ticket.vehicle ? (
                                        <code className="plate">
                                          {ticket.vehicle}
                                        </code>
                                      ) : (
                                        "—"
                                      )}
                                    </td>
                                    <td>
                                      <span
                                        className={`status ${ticket.status}`}
                                      >
                                        <i />
                                        {statusLabel[ticket.status]}
                                      </span>
                                      <small>Đến {ticket.validTo}</small>
                                    </td>
                                    <td>{ticket.createdAt}</td>
                                    <td>
                                      <button
                                        className="icon-button table-action"
                                        onClick={() => openTicket(ticket)}
                                        aria-label={`Xem ${ticket.ticketId}`}
                                      >
                                        <Icon name="eye" />
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
                  )
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
                onClick={() => setSelected(null)}
              >
                <span>←</span>
                Quay lại danh sách
              </button>
              <div>
                <h1>Chi tiết cá nhân</h1>
                <p>
                  Hồ sơ của {selected.fullName} theo phiếu làm việc được chọn
                </p>
              </div>
            </div>

            <div className="detail-layout">
              <aside className="profile-card">
                <div className="profile-identity">
                  <div className="profile-avatar">
                    {initials(selected.fullName)}
                  </div>
                  <h2>{selected.fullName}</h2>
                  <span className={`status ${selected.status}`}>
                    <i />
                    {statusLabel[selected.status]}
                  </span>
                </div>
                <div className="profile-validity">
                  <span>Thời hạn phiếu đang xem</span>
                  <strong>
                    {selected.createdAt} — {selected.validTo}
                  </strong>
                  <small>
                    Trạng thái và thời hạn chỉ áp dụng cho phiếu{" "}
                    {selected.ticketId}
                  </small>
                </div>
                <dl className="profile-info">
                  <div>
                    <dt>CCCD</dt>
                    <dd>{selected.citizenId || "Chưa có CCCD"}</dd>
                  </div>
                  <div>
                    <dt>Loại cá nhân</dt>
                    <dd>
                      <span className="type-chip">{selected.type}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Số điện thoại</dt>
                    <dd>{selected.phone}</dd>
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
                    <dt>Phương tiện</dt>
                    <dd>{selected.vehicle || "—"}</dd>
                  </div>
                </dl>
              </aside>

              <div className="detail-main-column">
                <section className="detail-card registration-card">
                  <div className="detail-card-title">
                    <div>
                      <Icon name="ticket" size={20} />
                      <strong>Lịch đăng ký của cá nhân</strong>
                    </div>
                    <span className="ticket-context">
                      {selectedPersonTickets.length} phiếu làm việc
                    </span>
                  </div>

                  <div className="detail-card-content">
                    <div className="detail-section-label">
                      <span>◷</span>
                      LỊCH RA VÀO
                    </div>
                    <div className="calendar-schedule-layout">
                      <div className="access-calendar">
                        <div className="calendar-toolbar">
                          <button
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
                              const month = event.target.value
                              if (!month) return
                              setCalendarMonth(month)
                              setSelectedCalendarDate(`${month}-01`)
                            }}
                          />
                          <button
                            aria-label="Tháng sau"
                            onClick={() => changeCalendarMonth(1)}
                          >
                            ›
                          </button>
                        </div>
                        <div className="calendar-weekdays">
                          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(
                            (day) => (
                              <span key={day}>{day}</span>
                            ),
                          )}
                        </div>
                        <div className="calendar-grid">
                          {calendarDays.map((date, index) =>
                            date ? (
                              <button
                                key={date}
                                className={[
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
                                <span>{Number(date.slice(-2))}</span>
                                {ticketsByAccessDate.has(date) && (
                                  <i>
                                    <b />
                                    {(ticketsByAccessDate.get(date)?.length ||
                                      0) > 1 && (
                                      <em>
                                        {ticketsByAccessDate.get(date)?.length}
                                      </em>
                                    )}
                                  </i>
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
                          <span>
                            <i /> Ngày có phiếu
                          </span>
                          <small>Chọn ngày để xem toàn bộ phiếu</small>
                        </div>
                      </div>

                      <div className="day-ticket-panel">
                        <div className="day-ticket-heading">
                          <div>
                            <span>PHIẾU TRONG NGÀY</span>
                            <strong>
                              {formatCalendarDate(selectedCalendarDate)}
                            </strong>
                          </div>
                          <b>{selectedDayTickets.length}</b>
                        </div>
                        {selectedDayTickets.length ? (
                          <div className="day-ticket-list">
                            {selectedDayTickets.map((ticket, index) => (
                              <button
                                key={ticket.id}
                                className={
                                  ticket.id === selected.id ? "current" : ""
                                }
                                onClick={() => setSelected(ticket)}
                              >
                                <div className="day-ticket-topline">
                                  <span
                                    className={`status ${ticket.status}`}
                                  >
                                    <i />
                                    {statusLabel[ticket.status]}
                                  </span>
                                  {ticket.id === selected.id && (
                                    <em>Đang xem</em>
                                  )}
                                </div>
                                <strong>{ticket.ticketId}</strong>
                                <span>
                                  {index % 2 === 0
                                    ? "08:00 – 11:30 · 13:30 – 17:00"
                                    : "09:00 – 12:00 · 14:00 – 16:30"}
                                </span>
                                <small>
                                  {ticket.contactUnit} · {ticket.officerCode}
                                </small>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="day-ticket-empty">
                            <span>○</span>
                            <strong>Không có phiếu trong ngày</strong>
                            <small>Hãy chọn ngày có chấm đỏ trên lịch.</small>
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
          </div>
        </section>
      )}
    </div>
  )
}

