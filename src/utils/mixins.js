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
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
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