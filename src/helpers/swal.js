import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const Loading = Swal.mixin({
  title: 'Please Wait !',
  allowEscapeKey: false,
  allowOutsideClick: false,
  showConfirmButton: false,
  willOpen: () => {
    Swal.showLoading()
  },
})

export const Close = Swal.mixin({
  willOpen: () => {
    Swal.close()
  },
})

export const swal = (title, icon = 'success') => {
  Toast.fire({ title, icon })
}

export const swalLoading = () => {
  Loading.fire()
}

export const swalClose = () => {
  Close.fire()
}
