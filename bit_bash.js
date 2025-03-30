// BIT BASHING TOOL

var uiBitArray = document.getElementById("bit-array");

// Conversion Functions
function bitArrayToInt(bitArray)
{
    if (this.bits.length == 0)
    {
        return 0;
    }
    else
    {
        return this.bits.reduce((acc, val) => {
            return (acc << 1) | val;
        });
    }
}

function intToBitArray(int)
{
    return int.toString(2).split("");
}

function pruneOrPadArray(array, desiredLength)
{
    let length = array.length;

    if (length == desiredLength)
    {
        return array;
    }

    // pad with 0s at start
    else if (length < desiredLength)
    {
        for (let i = 0; i < desiredLength-length; i++)
        {
            array.unshift("0");
        }
    }

    else
    {
        for (let i = 0; i < length-desiredLength; i++)
        {
            array.shift();
        }
    }

    return array;

}

// UI functions
function getBitDiv(bitExponent)
{
    return document.getElementById("bit-" + String(bitExponent));
}

function getBitValueDisplayDiv(bitExponent)
{
    return document.getElementById("bit-" + String(bitExponent) + "-value-display");
}

function getBitExponentDisplayDiv(bitExponent)
{
    return document.getElementById("bit-" + String(bitExponent) + "-exp-display");
}


// TODO change to innerHtml command instead
function createBitDiv(exponent)
{
    // create bit div
    let uiBlankBit = document.createElement("div");
    uiBlankBit.className = "bit";
    uiBlankBit.id = "bit-" + String(exponent);
    uiBitArray.appendChild(uiBlankBit);

    // create bit exp-disp div
    let uiExpDisplay = document.createElement("div");
    uiExpDisplay.className = "bit-value-display";
    uiExpDisplay.id = "bit-" + String(exponent) + "-exp-display";
    uiExpDisplay.innerText = String(exponent);
    uiBlankBit.appendChild(uiExpDisplay);

    // create bit value-disp div
    let uiValueDisplay = document.createElement("div");
    uiValueDisplay.className = "bit-value-display";
    uiValueDisplay.id = "bit-" + String(exponent) + "-value-display";
    uiBlankBit.appendChild(uiValueDisplay);

    return uiBlankBit;
}


class Bit
{
    constructor(initialValue, exponent)
    {
        this.value = initialValue;
        this.exponent = exponent;
        this.ui = createBitDiv(exponent);
    }

    setValue(value)
    {
        this.value = value;
        this.updateUi();
    }

    updateUi()
    {
        let ui = getBitValueDisplayDiv(this.exponent);
        if (ui != null)
        {
            getBitValueDisplayDiv(this.exponent).textContent = String(this.value);
        }
    }

}


class BitBash
{

    constructor(bits)
    {
        this.nBits = bits;
        this.bits = [];
        this.value = 0;

        // this.updateUi();

    }

    clearBits()
    {
        this.bits = [];
        uiBitArray.innerHTML = "";
    }

    // value setter function
    setValue(value)
    {
        let binArray = pruneOrPadArray(intToBitArray(value), this.nBits)
        this.clearBits();
        binArray.forEach((element, index) => {
            this.bits.push(new Bit(element, binArray.length-(index+1)));
        });
        this.updateUi();
    }

    // updates ui for all bits
    updateUi()
    {
        this.bits.forEach((bit, index) => {
            this.bits[index].updateUi();
        });
    }

}

let bitBash = new BitBash(8)
bitBash.setValue(65);

document.getElementById("input-value").addEventListener("change", (e) => {
    bitBash.setValue( Number(e.target.value) );
    console.log("HELLO");
});

console.log("DONE");