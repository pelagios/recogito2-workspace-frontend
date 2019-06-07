/** Icons for possible content type values **/
const ICONS = {
  TEXT_PLAIN   : 'icon_text.png',
  TEXT_TEIXML  : 'icon_tei.png',
  IMAGE_UPLOAD : 'icon_image.png',
  IMAGE_IIIF   : 'icon_iiif.png',
  DATA_CSV     : 'icon_csv.png'
};

export default class TypeIcons {

  static get = docType => ICONS[docType];

}
