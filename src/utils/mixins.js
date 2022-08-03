import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://loremflickr.com/100/100/avatar/?random=${Math.random()*100}'
    },
    emptyCover (src) {
      return src || 'https://raw.githubusercontent.com/dodouuu/pictures/main/unsplash_cO9_joZ1FdA.png'
    }
  }
}

export const localeSupport = {
  filters: {
    localeSupport(datetime) {
      if (datetime) {
        let str = moment(datetime).format('LT')
        str += ' · '
        str += moment(datetime).format('LL')
        return str
      } else{
        return '-'
      }
    }
  }
}