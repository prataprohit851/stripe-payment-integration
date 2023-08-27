
function calculator(e){
    console.log(e);
    const duration = e.duration;
    const code = e.code;

    var durationMultiply = 1;
    var codeMultiply = 1;

    if(duration === 'Monthly'){
        durationMultiply = 100;
    }
    else{
        durationMultiply = 1000;
    }

    if(code === 'Mobile'){
        codeMultiply = 1;
    }
    else if(code === 'Basic'){
        codeMultiply = 2;
    }
    else if(code === 'Standard'){
        codeMultiply = 5;
    }
    else{
        codeMultiply = 7;
    }

    return durationMultiply*codeMultiply;

}

module.exports = {calculator};