var SquareVerifier = artifacts.require('SquareVerifier');


// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps
var proof = {
    "a": [
      "0x1b3b2b0d5d7133ae2b1638c921a17a33fefd3e5b14fcca8a9e50bf1b80781cce",
      "0x13b81c421737a99a4c9af634ba326f7b6f3db94f6495fe39bf0d3b125af5c2bd"
    ],
    "b": [
      [
        "0x0ca793e6ec8a831070d0c3e615cb26276006e8b0f2a12da46199de27ae5e7112",
        "0x230bdc32b8295a898712aa934648a63f67c1c04f0ed0f6b61647481065beb58e"
      ],
      [
        "0x082cb6f02d65466abc19eb5a805b1a4d5c765e8a167b6584824f3912a235171f",
        "0x1b1f11be45a606f0420511dd89b9175cf1cc90e8bccb30e5e00e81ee42bcc532"
      ]
    ],
    "c": [
      "0x09a6d81f0d3128a45300c0931f6a01c1fc4db700c3dd46a9f4bac95996f5c386",
      "0x1d929a35987706b0f9f8ad0103affb542df80755c69c9a9d51a236da95c098e0"
    ]
  };

var input =  ["0x0000000000000000000000000000000000000000000000000000000000000001"];

contract('TestSquareVerifier', accounts => {
	const account_one = accounts[0];

    describe('can verify', function () {
        beforeEach(async function () { 
            this.contract = await SquareVerifier.new({from: account_one});
        });

        it('should verify', async function () { 
           let _verification = await this.contract.verifyTx(proof.a, proof.b, proof.c, input);
           assert.equal(_verification, true, "Test verification with correct proof");
     	});


		// Test verification with incorrect proof
        it('should not verfy', async function () { 
        	let cheat = input;
			cheat[cheat.length-1] = cheat[cheat.length-1].replace(/[01]$/, cheat[cheat.length-1][65] == '1' ? '0': '1');
            let _verification2 = await this.contract.verifyTx(proof.a, proof.b, proof.c, cheat);
            assert.equal(_verification2, false, "Test verification with incorrect proof");
        });
    })
})
    
