import { DeviceCategory } from 'models/global'

export const setGridSize = () => {
  if (window.matchMedia('(max-width: 641px)').matches) {
    return DeviceCategory.Mobile
  } else if (window.innerWidth < 961) {
    return DeviceCategory.Tablet
  } else {
    return DeviceCategory.Desktop
  }
}

export const handleWindowSizeChange = () => {
  if (window.innerWidth < 641) {
    return DeviceCategory.Mobile
  } else if (window.innerWidth < 961) {
    return DeviceCategory.Tablet
  } else return DeviceCategory.Desktop
}
