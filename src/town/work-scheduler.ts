import type {FarmJob} from './farming';
/** Finish a batch before yielding a worker, so long deliveries cannot starve. */
export function scheduledJobs(farm:FarmJob[],village:FarmJob[]):FarmJob[]{
 const rank=(a:FarmJob,b:FarmJob)=>(a.cycles||0)-(b.cycles||0)||a.fieldId.localeCompare(b.fieldId);
 const fields=[...farm].sort(rank),other=[...village].sort(rank);
 const farmSlots=other.length?1:3;return [...fields.slice(0,farmSlots),...other.slice(0,3-Math.min(farmSlots,fields.length))];
}
