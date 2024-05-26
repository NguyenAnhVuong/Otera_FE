const vi = {
  start: "Bắt đầu",
  end: "Kết thúc",
  save: "Lưu",
  upload: "Tải lên",
  errorOccurred: "Đã xảy ra lỗi",
  seeMore: "Xem thêm",
  noNotification: "Hiện tại chưa có thông báo nào",
  email: "Email",
  send: "Gửi",
  action: "Hành động",
  admin: "Quản trị viên",
  member: "Thành viên",
  role: "Vai trò",
  avatar: "Ảnh đại diện",
  copied: "Đã sao chép",
  copy: "Sao chép",
  expired: "Hết hạn",
  reset: "Đặt lại",
  status: "Trạng thái",
  search: "Tìm kiếm",
  detail: "Chi tiết",
  notification: "Thông báo",
  yes: "Có",
  no: "Không",
  OK: "OK",
  cancel: "Hủy",
  close: "Đóng",
  gender: {
    male: "Nam",
    female: "Nữ",
    other: "Khác",
  },
  temple: {
    title: "Nhà chùa",
    temples: "Danh sách nhà chùa",
  },
  selectTemple: "Chọn nhà chùa",
  publicUser: "Khách vãng lai",
  register: "Đăng ký",
  declareDeceased: "Khai báo thành viên an nghỉ",
  filter: "Lọc",
  all: "Tất cả",
  noData: "Không có dữ liệu",
  validateMessages: {
    required: (label: string) => `Vui lòng nhập ${label}!`,
    types: {
      email: "Vui lòng nhập đúng định dạng email!",
    },
  },
  deathAnniversary: {
    reject: "Từ chối",
    approve: "Chấp nhận",
    pending: "Đang chờ",
    watchLiveStream: "Xem live stream",
    editInfo: "Chỉnh sửa thông tin",
    cancelRegister: "Hủy đăng ký",
    updateDeathAnniversary: "Cập nhật thông tin lễ giỗ",
    updateDeathAnniversarySuccessMessage:
      "Cập nhật thông tin lễ giỗ thành công!",
    cancelDeathAnniversarySuccessMessage: "Hủy đăng ký lễ giỗ thành công!",
    cancelDeathAnniversaryFailMessage: "Hủy đăng ký lễ giỗ thất bại!",
    rejectModal: {
      title: "Từ chối",
      rejectReason: "Lý do từ chối",
      rejectSuccessMessage: "Đã từ chối!",
      rejectFailMessage: "Từ chối thất bại!",
      cancelText: "Hủy",
      enableUpdate: "Cho phép cập nhật thông tin lễ giỗ",
    },
    rejectInforModal: {
      title: "Lý do từ chối",
    },
    cancelDeathAnniversaryPopConfirm: {
      title: "Hủy đăng ký lễ giỗ",
      description: "Bạn có chắc chắn muốn hủy đăng ký lễ giỗ?",
    },
    desiredTime: "Thời gian mong muốn",
    organizeLivestream: "Tổ chức livestream",
  },
  deceased: {
    name: "Họ và tên",
    birthday: "Ngày sinh",
    dateOfDeath: "Ngày mất",
    address: "Địa chỉ",
    gender: "Giới tính",
    description: "Mô tả",
    citizenNumber: "Căn cước công dân/CMND",
    avatar: "Ảnh đại diện",
    descriptionImages: "Ảnh mô tả",
    temple: "Nhà chùa",
    deceasedList: "Danh sách thành viên an nghỉ",
    title: "Thành viên an nghỉ",
    update: "Cập nhật thông tin",
    updateSuccessMessage: "Cập nhật thông tin thành công!",
    updateFailedMessage: "Cập nhật thông tin thất bại!",
    comingDeathAnniversary: "Ngày giỗ sắp tới",
    registerDeathAnniversary: "Đăng ký tổ chức lễ giỗ",
    deathAnniversaryRegisterExpired: "Hạn đăng ký tổ chức lễ giỗ",
    updateBy: "Cập nhật lần cuối bởi",
    delete: "Xoá thành viên an nghỉ",
    deleteDeceasedPopConfirm: {
      title: "Xoá thành viên an nghỉ",
      description: "Bạn có chắc chắn muốn xoá thành viên an nghỉ?",
    },
    deleteDeceasedSuccessMessage: "Xoá thành viên an nghỉ thành công!",
    deleteDeceasedFailMessage: "Xoá thành viên an nghỉ thất bại!",
  },
  family: {
    title: "Hộ gia đình",
    members: "Danh sách thành viên",
    familyMember: {
      removeSuccessMessage: "Xóa thành viên thành công!",
      removeFailedMessage: "Xóa thành viên thất bại!",
      reject: "Từ chối",
      approve: "Chấp nhận",
      approveSuccessMessage:
        "Tham gia gia đình thành công! Vui lòng đăng nhập lại!",
      rejectSuccessMessage: "Từ chối thành công!",
      approveFailMessage: "Chấp nhận thất bại! Lời mời đã hết hạn!",
      rejectFailMessage: "Từ chối thất bại! Lời mời đã hết hạn!",
      add: "Thêm thành viên",
      addMessage: "Gửi lời mời đến",
      name: "Họ và tên",
      birthday: "Ngày sinh",
      address: "Địa chỉ",
      email: "Email",
      phone: "Số điện thoại",
      deleteMember: "Xóa thành viên",
      deleteMemberPopConfirm: {
        title: "Xóa thành viên",
        description: "Bạn có chắc chắn muốn xóa thành viên?",
      },
      inviteSuccessMessage: "Gửi lời mời thành công!",
      inviteFailedMessage:
        "Tài khoản này không tồn tại hoặc đã tham gia vào một gia đình khác!",
    },
  },
  event: {
    copyLinkEvent: "Sao chép link sự kiện",
    event: "Sự kiện",
    listEvents: "Danh sách sự kiện",
    events: "Sự kiện",
    bookingEvents: "Sự kiện đã đăng ký",
    eventManagements: "Quản lý sự kiện",
    organizeEvent: "Tổ chức sự kiện",
    name: "Tên sự kiện",
    description: "Mô tả",
    eventTime: "Thời gian tổ chức sự kiện",
    bookingTime: "Thời gian đăng ký tham gia",
    createdAt: "Ngày tạo",
    startTime: "Bắt đầu",
    endTime: "Kết thúc",
    address: "Nơi tổ chức",
    isOrganizedAtTemple: "Tổ chức tại nhà chùa",
    phone: "Số điện thoại hỗ trợ",
    email: "Email",
    maxParticipantLabel: "Tối đa",
    maxParticipant: (max: number) => `Tối đa: ${max}`,
    avatar: "Ảnh đại diện",
    participants: "Đối tượng tham gia",
    organizeEventSuccessMessage: "Tổ chức sự kiện thành công!",
    organizeEventFailMessage: "Tổ chức sự kiện thất bại!",
    updateEventSuccessMessage: "Cập nhật thông tin sự kiện thành công!",
    updateEventFailMessage: "Cập nhật thông tin sự kiện thất bại!",
    cancelEventSuccessMessage: "Hủy sự kiện thành công!",
    cancelEventFailMessage: "Hủy sự kiện thất bại!",
    time: "Thời gian",
    all: "Tất cả",
    registration: "Đăng ký",
    approved: "Chấp nhận",
    rejected: "Từ chối",
    eventTimeFormat: "mm:HH DD/MM/YYYY",
    updateEvent: "Cập nhật thông tin sự kiện",
    cancelEvent: "Hủy sự kiện",
    cancelConfirmTitle: "Hủy sự kiện",
    cancelConfirmDescription: "Bạn có chắc chắn muốn hủy sự kiện?",
    upcoming: "Sắp diễn ra",
    onGoing: "Đang diễn ra",
    ended: "Đã kết thúc",
    bookingEvent: "Đăng ký tham gia",
    bookingEventSuccessMessage: "Đăng ký tham gia sự kiện thành công!",
    bookingEventFailMessage: "Đăng ký tham gia sự kiện thất bại!",
    isBooked: "Đã đăng ký",
    isFull: "Đã đủ người tham gia",
    bookingParticipant: "Đăng ký",
    currentParticipant: "Chấp nhận",
    checkInParticipant: "Check-in",
    action: "Hành động",
    editInfo: "Chỉnh sửa thông tin",
    cancelEventPopConfirm: {
      title: "Hủy sự kiện",
      description: "Bạn có chắc chắn muốn hủy sự kiện?",
    },
    participantCount: "Số lượng người tham gia",
    participantList: "Danh sách người tham gia",
    participant: {
      avatar: "Ảnh đại diện",
      name: "Tên",
      email: "Email",
      address: "Địa chỉ",
      familyName: "Hộ gia đình",
      belongsToTemple: "Thuộc chùa",
      createdAt: "Ngày đăng ký",
      rejectReason: "Lý do từ chối",
      approveMessage: (name: string) => `Cho phép ${name} tham gia sự kiện?`,
      approveSuccessMessage: (name: string) =>
        `Đã cho phép ${name} tham gia sự kiện!`,
      rejectSuccessMessage: (name: string) =>
        `Đã từ chối ${name} tham gia sự kiện!`,
      approveFailMessage: "Chấp nhận thất bại!",
      rejectFailMessage: "Từ chối thất bại!",
      checkIn: "Check-in",
      checkInAt: "Thời gian check-in",
      notCheckIn: "Chưa check-in",
      approvedBy: (name: string) => `Được chấp nhận bởi ${name}`,
      at: "vào lúc",
      code: "Mã tham gia",
      checkInSuccessMessage: "Check-in thành công!",
      checkInFailMessage: "Check-in thất bại!",
      checkInNotAvailable: "Chưa đến giờ check-in",
      pending: "Đang chờ",
      approved: "Chấp nhận",
      rejected: "Từ chối",
      cancelBookingPopConfirm: {
        title: "Hủy đăng ký",
        description: "Bạn có chắc chắn muốn hủy đăng ký?",
      },
      cancelBookingSuccessMessage: "Hủy đăng ký thành công!",
      cancelBookingFailedMessage: "Hủy đăng ký thất bại!",
    },
  },
};

export default vi;
