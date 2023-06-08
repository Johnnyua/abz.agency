<template>
    <v-header></v-header>
    <main class="main">
        <section class="main__heading heading">
            <v-image class="heading__img" :imageURL="mainImage" :altImage="'Main image'" />
            <div class="heading__content content container">
                <div class="content__text text">
                    <v-heading class="text__title title">Test assignment for front-end developer</v-heading>
                    <v-text class="text__text">
                        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with
                        a vast understanding of User design thinking as they'll be building web interfaces with
                        accessibility in mind. They should also be excited to learn, as the world of Front-End
                        Development keeps evolving.
                    </v-text>
                </div>
                <div class="content__btn">
                    <v-button>Sing up</v-button>
                </div>
            </div>
        </section>
        <section class="main__cards content container">
            <v-heading class="content__title title">Working with GET request</v-heading>
            <v-cards :users="sortedUsers"></v-cards>
            <v-loader v-show="isLoading"></v-loader>
            <div class="content__btn" v-show="currentPage !== totalPages">
                <v-button @click="showMoreUsers">Show more</v-button>
            </div>
        </section>
        <section class="main__form content container">
            <v-heading class="form__title main__title">Working with <br class="mobile"> POST request</v-heading>
            <v-form v-show="!successReg" :radioValues="positions" :error="errorForm" @submitForm="addUser"></v-form>
            <v-image v-show="successReg" :imageURL="successImg" :altImage="'User is registration successfully'"></v-image>
        </section>
    </main>
</template>

<script>
import { getUsers, getUsersPositions, postUser } from "@/api/users.js";
import { getToken, getTokenFromLocalStorage, saveTokenToLocalStorage, removeTokenFromLocalStorage } from "@/api/token.js";
export default {
    data() {
        return {
            mainImage: '../assets/img/pexels-alexandr-podvalny-1227513.jpeg',
            users: [],
            maxCountUsers: 0,
            maxCountOfPage: 6,
            totalPages: 0,
            totalUsers: 0,
            currentPage: 1,
            isLoading: false,
            positions: {
                positionsList: [],
                defaultPosition: '',
            },
            errorForm: {
                name: '',
                email: '',
                phone: '',
                image: '',
            },
            successImg: '../assets/img/success-image.svg',
            successReg: false,
        }
    },
    methods: {
        async addToken() {
            let token = await getTokenFromLocalStorage();
            if (token === null) {
                const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';
                const tokenData = await getToken(url);
                token = tokenData.data.token;
                saveTokenToLocalStorage(token);
            }
            return token;
        },
        async loadUsers(userExist = false) {
            this.isLoading = true;
            const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
            const paramsUsers = {
                page: this.currentPage,
                count: this.maxCountOfPage,
            }
            await new Promise(resolve => { setTimeout(resolve, 1000) });
            const users = await getUsers(url, paramsUsers);
            this.totalPages = users.data.total_pages;
            this.totalUsers = users.data.total_users;
            if (userExist) {
                return;
            }
            if (this.currentPage === 1) {
                this.users = users.data.users;
            } else {
                this.users.push(...users.data.users);
            }
            this.isLoading = false;
            this.currentPage === this.totalPages ? this.currentPage = 1 : this.currentPage += 1;
        },
        async getPositions() {
            const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';
            const usersPositions = await getUsersPositions(url);
            this.positions.positionsList = usersPositions.data.positions;
            this.positions.defaultPosition = usersPositions.data.positions[0].name;
        },
        showMoreUsers() {
            this.loadUsers();
        },
        async addUser(user) {
            const phone = user.phone.replace(/[\s\-\(\)]/g, '');
            user.phone = phone;
            user.position_id = this.positions.positionsList.find(item => { return item.name === user.position }).id;

            // --------------- Check form and check user exist
            if (this.checkForm(user)) {
                return;
            };
            if (this.checkUserExist(user)) {
                return;
            };

            // --------------- Add user
            const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
            const token = await this.addToken();
            const headers = {
                'Content-Type': 'multipart/form-data',
            };
            headers.Token = token;
            const result = await postUser(url, user, headers);
            if (result.status === 200 || result.status === 201) {
                this.showUserSuccessfullRegistration();
                removeTokenFromLocalStorage(token);
                this.addToken();
                this.loadUsers();
            }
            else if (result.response.status === 401) {
                removeTokenFromLocalStorage(token);
                this.addToken();
            } else if (result.response.status === 409) {
                this.errorForm.email = 'User with this phone or email already exist';
                this.errorForm.phone = 'User with this phone or email already exist';
            }
            console.log(result);
        },
        showUserSuccessfullRegistration() {
            this.successReg = true;
            setTimeout((scope) => {
                scope.successReg = false;
            }, 3000, this);
        },
        checkForm(user) {
            const emailPattern = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/gm;
            const phonePattern = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;
            let hasError = false;
            for (let key in this.errorForm) {
                this.errorForm[key] = '';
            }

            if (user.name.length < 2 || user.name.length > 60) {
                this.errorForm.name = 'Username should contain 2-60 characters';
                hasError = true;
            }

            if (!emailPattern.test(user.email)) {
                this.errorForm.email = 'User email must be a valid email according to RFC2822';
                hasError = true;
            }

            if (!phonePattern.test(user.phone)) {
                this.errorForm.phone = 'Phone number should start with code of Ukraine +380';
                hasError = true;
            }

            if (user.photo == null) {
                this.errorForm.image = 'You must upload your photo';
                hasError = true;
            } else {
                const imgDimensions = this.getImageDimensions(user.photo);
                if (imgDimensions.width < 70 || imgDimensions.height < 70 || user.photo.size > 5000000 || user.photo.type !== 'image/jpeg') {
                    this.errorForm.image = 'User photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB';
                    hasError = true;
                }
            }
            return hasError;
        },
        checkUserExist(user) {
            this.loadUsers(true);
            // console.log(this.users);
            return false;
        },
        getImageDimensions(file) {
            let img = {
                width: 0,
                height: 0
            };
            let reader = new FileReader();

            const readerResult = new Promise(resolve => {
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    let image = new Image();
                    image.src = e.target.result;
                    resolve(image);
                }
            }).then(result => {
                result.onload = () => {
                    img.width = result.width;
                    img.height = result.height;
                    return img;
                }
            });
            return readerResult;
        }
    },
    computed: {
        sortedUsers() {
            return [...this.users].sort(function (x, y) {
                let sorted = y.registration_timestamp - x.registration_timestamp;
                return sorted;
            });
        }

    },
    mounted() {
        this.addToken();
        this.loadUsers();
        this.getPositions();
    },
}
</script>

<style lang="scss" scoped>
.main__heading {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 500px;
    overflow: hidden;

    @media (min-width: 1024px) {
        height: 650px;
    }
}

.heading__img {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}

.heading__content {
    position: relative;
    z-index: 1;
    text-align: center;

    @media (min-width: 768px) {
        width: 380px;
        padding: 0;
    }
}
</style>