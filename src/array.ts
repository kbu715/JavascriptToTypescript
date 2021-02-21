export {};

function print() {
  /*
        filter, includes, from을 사용해서 문자열 'e'가 포함된
        노드로 구성된 배열을 만들어서 반환하기
    */

  const list = document.querySelectorAll('li');
  console.log(list);
  const array = Array.from(list);

  const newArray = array.filter(item => item.innerText.includes('e')); //노드로 구성된 배열
  console.log(newArray.length);
}

print();
