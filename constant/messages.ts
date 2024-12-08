export const Messages = {
  login: {
    title: 'เข้าสู่ระบบ',
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
    placeholderUser: 'Type username',
    placeholderPass: 'Type password',
    loginBtn: 'เข้าสู่ระบบ',
    loader: 'กำลังเข้าสู่ระบบ',
  },
  navbar: {
    profile: { welcome: 'My Account', logout: 'ออกจากระบบ' },
  },
  validation: {
    usernameReq: 'กรุณาใส่ชื่อผู้ใช้ เนื่องจากเป็นสิ่งที่จำเป็น',
    passwordReq: 'กรุณาใส่รหัสผ่าน เนื่องจากเป็นสิ่งที่จำเป็น',
  },
  api: {
    notFoundUser: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้องโปรดลองใหม่อีกครั้ง',
  },
  toast: {
    destructive: 'โอ้ะโอ้! มีบางอย่างผิดพลาด.',
  },
  rooms: {
    addRoomsBtn: 'เพิ่มห้องพัก',
    modal: {
      title: 'เพิ่มห้องพัก',
      selectDormitory: {
        placeholder: 'เลือกอาคาร',
        find: 'กรอกชื่ออาคารที่คุณต้องการ',
        newDormitory: 'เพิ่ม อาคาร',
      },
      tabs: {
        single: {
          title: 'ห้องเดียว',
          labelRoomNumber: 'หมายเลขห้อง',
          roomNumberPlaceholder: 'กรองหมายเลขห้องที่คุณต้องการเพิ่ม',
        },
      },
      toast: {
        success: { title: 'เพิ่มห้องสำเร็จ' },
      },
    },
  },
  confirmAction: {
    message: 'คุณต้องการทำสิ่งนี้หรือไม่?',
    title: 'ยืนยันการทำงาน',
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  },
}
