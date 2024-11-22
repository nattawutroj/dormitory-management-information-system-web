import { Enums } from '@/utils/supabase/database.types'

export const listMenu: {
  title: string
  path: string
  separate?: boolean
  role: Enums<'role'>[]
}[] = [
  {
    title: 'หน้าหลัก',
    path: '/management',
    role: ['superuser', 'admin'],
  },
  {
    title: 'รายการห้องพัก',
    path: '/management/rooms',
    role: ['superuser', 'admin'],
  },
  {
    title: 'บันทึกการอ่านมิเตอร์ไฟ',
    path: '/management/meter-reading',
    role: ['superuser', 'admin', 'moderator'],
  },
  {
    title: 'การคำนวณค่าไฟ',
    path: '/management/electricity-billing',
    role: ['superuser', 'admin'],
  },
  {
    title: 'ประวัติการชำระเงิน',
    path: '/management/payment-history',
    role: ['superuser', 'admin'],
  },
  {
    title: 'รายงาน',
    path: '/management/reports',
    role: ['superuser', 'admin'],
  },
  {
    title: 'การจัดการผู้ใช้งาน',
    path: '/management/user-management',
    role: ['superuser', 'admin'],
  },
  {
    title: 'การตั้งค่า',
    path: '/management/settings',
    role: ['superuser', 'admin'],
  },
]
