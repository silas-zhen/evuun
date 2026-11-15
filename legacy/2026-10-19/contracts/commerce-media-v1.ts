/** Same public projection for published cards, REST and commercial MCP. */
export type PublicCommerceMediaAsset = {
  media_id:string;item_ids:string[];entity_id:string;entity_name?:string;
  subject_type:'hotel'|'service'|'destination'|'concept';
  depiction?:'actual_property'|'actual_service'|'destination_photo'|'illustration';
  public_url:string;mime:'image/jpeg'|'image/png'|'image/webp'|'image/avif';
  width:number;height:number;bytes:number;sha256:string;version:string;
  alt:{en:string;'zh-CN':string};caption:{en:string;'zh-CN':string};
  credit:string;creator?:string;source_title?:string;source_url:string;
  license:{name:string;url:string;attribution_required:boolean;share_alike:boolean};
  uses:{display_on_evuun:true;render_in_agent_ui:true;rehost_allowed:true;
    crop_allowed:boolean|null;commercial_use_allowed?:boolean};
  restrictions?:string[];changes?:string;focus?:{x:number;y:number};
  variants:{url:string;mime:string;width:number;height:number;sha256:string;role:'original'}[];
};
export type PublicCommerceMedia = {
  cover:PublicCommerceMediaAsset|null;gallery:PublicCommerceMediaAsset[];
  manifest_url:string|null;revision:string|null;
};
/** Endpoint /api/v1/commerce/services and evuun_discover_services share this
 * projection. A prepared source-backed inquiry carries media at top level.
 * File URLs are actual immutable same-origin HTTPS bytes. Licenses and usage
 * restrictions apply in the consuming UI. Internal paths/evidence never ship.
 * Public display supplies no merchant agreement, quote or financial authority. */
