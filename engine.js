(function(root){
function shuffle(items,rng=Math.random){let a=[...items];for(let i=a.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function correct(task,answer){if(task.type==='text'){const normalize=s=>typeof s==='string'?s.trim().replace(/\s+/g,' ').toLocaleLowerCase('de'):'';return normalize(answer)===normalize(task.answer)}return Array.isArray(task.answer)?Array.isArray(answer)&&answer.length===task.answer.length&&answer.every((v,i)=>v===task.answer[i]):answer===task.answer}
function score(results){return results.filter(Boolean).length}
const api={shuffle,correct,score};if(typeof module!=='undefined')module.exports=api;root.QuizEngine=api;
})(typeof window!=='undefined'?window:globalThis);
