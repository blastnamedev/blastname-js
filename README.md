<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://blastname.com/images/logo-full.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center" style="color:rgb(252, 252, 5)">Blastname JS</h1>

  <p align="center">The 1st Decentralized Domain Name > Built on: <span style="color:rgb(252, 252, 5)">Blast</span>
    <br />
    <a href="https://docs.blastname.com"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://blastname.com">Homepage</a>
    ·
    <a href="https://app.blastname.com">Blastname App</a>
    ·
    <a href="https://discord.com/invite/5fgXRVQSyP">Community</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The <span style="color:rgb(252, 252, 5)">Blastname</span>

[![Product Name Screen Shot][product-screenshot]](https://blastname.com/images/app-screencapture.png)

Welcome to BlastName, the first Domain Name System that generates native yield on Blast L2, optimizing capital efficiency for the Blast NFT ecosystem. 

BlastName leverages ENS's standard for its domain processing system based on ENS's well-established track record, having passed stringent security audits and earning widespread adoption by major players in the blockchain space, with some adjustments to fit our model and project's goals.

We know it can be confusing for newcomers, so we've included a simple table below to explain the basics. Think of ENS like a phonebook for crypto wallets. Instead of using long, complex addresses "0x88eFda...566", you can use human-readable names like 'alice.eth'. This name points to your actual wallet address behind the scenes, making it easier to remember, share, and use your wallet address. You can also link your website, social media profiles, or even many other crypto addresses to your purchased domain name, making it a powerful tool for managing your online identity in the crypto world.

| Registry      | Registrars    | Resolver     |
| :---          | :----   |:--- |
| Core contract      | Merchant Entities       | Translator program   |
| Maintain central record of all domain names   | <ul><li>Sell and manage domains</li> <li>Act as intermediaries between users and the Registry<br></li><li>Facilitate the registration and renewal proces<br></li><li>Issue domain NFTs</li></ul>|<ul><li>Translate human-readable names into machine-readable addresses</li><li>Store additional data associated with the name, such as content hashes or links to websites</li></ul>     |
| Controlled by DAO voting      | Follow a guideline       | Unrestricted   |
|<ul><li>Anyone can interact</li><li>Modification requires DAO's permission</li></ul>      |<ul><li>Anyone can signup to become one</li><li>Will be revoked if violate guideline</li></ul>       | Unrestricted   |


As the community grows, the DAO will gradually gain more influence over specific project decisions, starting with some limited adjustments during the upcoming quarterly vote. We believe this gradual transfer of control will empower the community, incentivize participation, and ensure the project's long-term success. We encourage all fans and community members to join our discussions and contribute to the DAO's formation.


### Built With

BlastnameJs integrates ENS and supports all the ENSjs APIs, you will only need one unified SDK to integrate all domains on Blast L2.


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
We recommend switching to <b>Node.js Version 18</b> to make sure common crypto dependencies works.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Setup
    
    import ENS, { getEnsAddress } from 'blastname-js/ensjs'


    const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })

    ens.name('0x.blast').getAddress() // 0x123
    
    

  ```provider```: https://web3js.readthedocs.io/


<!-- BlastnameJs interface -->
## BlastnameJS interface


```
name(name: String) => Name
```

Returns a Name Object, that allows you to make record queries.

```
resolver(address: BlastAddress) => Resolver
```

Returns a Resolver Object, allowing you to query names from this specific resolver. Most useful when querying a different resolver that is different than is currently recorded on the registry. E.g. migrating to a new resolver

```
async getName(address: BlastAddress) => Promise<Name>
```

Returns the reverse record for a particular Blast address.

```
async setReverseRecord(name: Name) => Promise<EthersTxObject>
```

Sets the reverse record for the current Blast address

### Name Interface

```ts
async getOwner() => Promise<BlastAddress>
```

Returns the owner/controller for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async setOwner(address: BlastAddress) => Promise<Ethers>
```

Sets the owner/controller for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async getResolver() => Promise<BlastAddress>
```

Returns the resolver for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async setResolver(address: BlastAddress) => Promise<BlastAddress>
```

Sets the resolver for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async getTTL() => Promise<Number>
```

Returns the TTL for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async getAddress(coinId: String) => Promise<BlastAddress>
```

Returns the address for the current <span style="color:rgb(252, 252, 5)">Blastname</span> for the coinId provided.

```ts
async setAddress(coinId: String, address: BlastAddress) => Promise<EthersTxObject>
```

Sets the address for the current <span style="color:rgb(252, 252, 5)">Blastname</span> for the coinId provided.

```ts
async getContent() => Promise<ContentHash>
```

Returns the contentHash for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async setContenthash(content: ContentHash) => Promise<EthersTxObject>
```

Sets the contentHash for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async getText(key: String) => Promise<String>
```

Returns the text record for a given key for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async setText(key: String, recordValue: String) => Promise<EthersTxObject>
```

Sets the text record for a given key for the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async setSubnodeOwner(label: String, newOwner: BlastAddress) => Promise<EthersTxObject>
```

Sets the subnode owner for a subdomain of the current <span style="color:rgb(252, 252, 5)">Blastname</span>.

```ts
async setSubnodeRecord(label: String, newOwner: BlastAddress, resolver: BlastAddress, ttl: ?Number) => Promise<EthersTxObject>
```

Sets the subnode owner, resolver, ttl for a subdomain of the current <span style="color:rgb(252, 252, 5)">Blastname</span> in one transaction.

```ts
 async createSubdomain(label: String) => Promise<EthersTxObject>
```

Creates a subdomain for the current <span style="color:rgb(252, 252, 5)">Blastname</span>. Automatically sets the owner to the signing account.

```ts
async deleteSubdomain(label: String) => Promise<EthersTxObject>
```

Deletes a subdomain for the current <span style="color:rgb(252, 252, 5)">Blastname</span>. Automatically sets the owner to "0x0..."

## Resolver Interface

```ts
address
```

Static property that returns current resolver address

```ts
name(name) => Name
```

Returns a Name Object that hardcodes the resolver

<!-- CONTACT -->
## Contact


[Discord](https://discord.com/invite/5fgXRVQSyP)

[Twitter](https://twitter.com/BlastName_)

[Reddit](https://www.reddit.com/user/BlastName_)

[Email](contact@blastname.com)


Project Link: [https://github.com/blastnamedev/blastname-js](https://github.com/blastnamedev/blastname-js)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/blastnamedev/blastname-js/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/blastnamedev/blastname-js/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/blastnamedev/blastname-js/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]:https://blastname.com/images/app-screencapture.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com