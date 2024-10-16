<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row">
        <div class="col-lg-6 col-md-4 col-sm-4">
          <h5>ລາຍລະອຽດນັດໝາຍ</h5>
        </div>

        <div class="col-lg-1 col-md-4 col-sm-4">
          <label for="inputEmail3" class="col-sm-12 col-form-label">
            ID ນັດໝາຍ:</label
          >
        </div>
        <div class="col-lg-3 col-md-4 col-sm-4">
          <input
            id="t-text"
            type="text"
            name="txt"
            placeholder="A83M100"
            class="form-control"
            v-model="store.searchapp.ap_number"
            maxlength="30"
          />
        </div>

        <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <button
            type="button"
            class="btn btn-primary"
            style="width: 100%; height: 100%; margin-top: auto"
            @click="SearchApp()"
          >
            Search
          </button>
        </div>
      </div>
      <hr style="margin-top: 1px" />
      <br />

      <div class="row m-1"  v-if="store.dataapp.length > 0">
        <div class="col-12 col-sm-12 col-xl-12 col-lg-12/ mb-3"  v-if="store.dataapp[0].app_status == 'Y'">
          <div class="form-group" style="text-align: right">
            <button type="button" class="btn btn-danger"  @click="ModalC()">ຍົກເລີກ</button>
          </div>
        </div>
        <br />
  
        <div class="col-12 col-sm-5 col-xl-5 col-lg-5 your-element">
          <div class="col-12 col-sm-7 col-xl-12 col-lg-12">
            <div class="form-group row">
              <div class="col-12 col-sm-7 col-xl-4 col-lg-4">
                <div class="col-12 col-sm-12 col-md-12">
                  <div class="form-group row">
                    <div class="invoice-detail-title">
                      <div class="invoice-logo">
                        <div class="profile-image">
                          <div
                            class="img-uploader-content"
                            style="padding: 5px"
                          >
                            <img v-if="store.dataapp[0].user_img"
                                :src="coverimage(store.dataapp[0].user_img)"
                              alt="avatar"
                              class="img-fluid"
                              width="200"
                              height="200"
                            />
                            <img v-else
                              src="../../assets/images/person-avatar.jpg"
                              alt="avatar"
                              class="img-fluid"
                              width="200"
                              height="200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-7 col-xl-8 col-lg-8">
                <div class="form-group row">
                  <h3>{{ store.dataapp[0].user_prefrix }} {{ store.dataapp[0].user_firstname }} {{ store.dataapp[0].user_lastname }}</h3>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm"
                  >
                  </label>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("tel") }} :{{ store.dataapp[0].user_phone }}</label
                  >
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    {{ $t("email") }} : {{ store.dataapp[0].user_email }}
                  </label>
                </div>
                <div class="form-group row">
                  <label
                    for="company-name"
                    class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  >
                    Username:{{ store.dataapp[0].user_name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_passport") }}:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_birth_day") }} :
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_passport_exp") }} :
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_cou") }} :
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_address") }} :
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                -{{ store.dataapp[0].identification_number }}</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
               - {{ store.dataapp[0].user_birthday }}</label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
               - {{ store.dataapp[0].exp_date }} 
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                - {{ store.dataapp[0].country_name_th }}
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  - {{store.dataapp[0].user_address}}
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                - ເມືອງ {{store.dataapp[0].amphur_name}} - ແຂວງ  {{store.dataapp[0].province_name}}
                </label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_pass_image") }} :
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8">
              <div class="form-group row" v-if="store.dataapp[0].passpost_image">
                <img
                 :src="coverimage(store.dataapp[0].passpost_image)"
              
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>

              <div class="form-group row" v-else>
                <img
                
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-12 col-sm-12 col-md-12">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                  style="font-size: 18px"
                >
                </label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4 col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  {{ $t("form_approve_real_image") }} :
                </label>
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8"  v-if="store.dataapp[0].real_image">
              <div class="form-group row">
                <img
                  :src="coverimage(store.dataapp[0].real_image)"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>

            <div class="col-8 col-sm-12 col-md-8"  v-else>
              <div class="form-group row">
                <img
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-7 col-xl-7 col-lg-7 your-element">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-lg fot-bl"
              >
              {{store.searchapp.ap_number}}
              </label>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-12 col-sm-12 col-md-12">
        
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ສອບເສັງ ປະເພດ:  A : ລົດຈັກສອງລໍ້ ຄວາມແຮງບໍ່ເກີນ 125 cc


                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ID ນັກຮຽນ:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ສະຖານະ:   ເສັງຜ່ານ
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                % ຮຽນຫຼັກສູດ A ໃນ App:  72.25%
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ລຳດັບສອບເສັງ:   1
                </label>
              </div>


              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ຜົນທິດສະດີ:   19/20 ໂດຍ: staff1  ,  2024-04-01 10:22:41
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ຜົນປະຕິບັດ:  85/100 ໂດຍ: E-driving ,  2024-04-01 11:32:23
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                ໝາຍເຫດ:   ເຫດຜົນທີ່ຍົກເລີກໃຫ້ຂຽນໃສ່ບ່ອນນີ້
                </label>
              </div>
            </div>

            

           
          </div> -->

          <div class="row">
            <div class="col-5 col-sm-12 col-md-5">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ສອບເສັງ ປະເພດ :
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ID ນັກຮຽນ:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ສະຖານະ:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ຮຽນຫຼັກສູດ {{store.dataapp[0].dlt_code}} ໃນ App:
                </label>
              </div>

              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm fot-bl"
                >
                  ຄະແນນສູງສຸດ ທີ່ເຮັດແບບທົດສອບ ໃນApp:
                </label>
              </div>
            </div>

            <div class="col-7 col-sm-12 col-md-7">
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                {{ store.dlt_select.dlt_code }}:{{ store.dlt_select.dlt_name_lo }}
                  </label
                >
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  ບໍ່ມີ
                </label>
              </div>
              <div class="form-group row">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  ເສັງຜ່ານ
                </label>
              </div>

              <div class="form-group row" v-if="store.history">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm" 
                >
                 
                  {{ store.history.progress }}%
                </label>
              </div>
              <div class="form-group row" v-if="store.score.length > 0">
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                  {{store.score[0].er_score_total}}/{{store.score[0].er_question_total}}
                </label>
              </div>
              <div class="form-group row" v-else>
                <label
                  for="company-name"
                  class="col-sm-12 col-form-label col-form-label-sm"
                >
                 -
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ລຳດັບສອບເສັງ :</label
              >
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-xl-6 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                1</label
              >
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-3"   v-if="store.dataapp[0].app_status == 'Y'">
              <button type="button" class="btn btn-primary" @click="Modaldiv()">ບັນທຶກ</button>
            </div>
          </div>

          <div class="row">
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-if="store.status_score == 'create'"
              >
            
                ຜົນທິດສະດີ:   -  </label
              >

              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-else
              >
           
                ຜົນທິດສະດີ:  
             
                <span v-if="store.status_status == 'pass'" style="color: green;"> {{store.dlt_score.mr_score}}/{{store.totalscore.total_question}}</span>
                <span v-if="store.status_status == 'fail'" style="color: red;"> {{store.dlt_score.mr_score}}/{{store.totalscore.total_question}}</span>
  
                </label
              >
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-xl-6 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-if="store.status_score == 'create'"
              >
                </label
              >

              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-else
              >
                ໂດຍ: {{store.dlt_score.user_name}} , {{store.dlt_score.time}}</label
              >
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-3" v-if="store.dataapp[0].app_status == 'Y'">
              <button type="button" class="btn btn-primary"  @click="ModalT()">
                ບັນທຶກ ຜົນທິດສະດີ
              </button>
            </div>
          </div>


          <div class="row">
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-if="store.status_scoreP == 'create'"
              >
            
                ຜົນປະຕິບັດ:   - </label
              >

              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-else
              >
           
              ຜົນປະຕິບັດ:  
             
                <span v-if="store.status_statusP == 'pass'" style="color: green;"> {{store.dlt_scoreP.mr_score}}/100</span>
                <span v-if="store.status_statusP == 'fail'" style="color: red;"> {{store.dlt_scoreP.mr_score}}/100</span>
  
                </label
              >
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-xl-6 col-lg-6">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-if="store.status_scoreP == 'create'"
              >
                </label
              >

              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm" v-else
              >
              ໂດຍ: {{store.dlt_scoreP.user_name}} ,{{store.dlt_scoreP.time}}</label
              >
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-xl-3 col-lg-3" v-if="store.dataapp[0].app_status == 'Y'">
              <button type="button" class="btn btn-primary"  @click="ModalP()">
                ບັນທຶກ ຜົນປະຕິບັດ
              </button>
            </div>
          </div>




          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
              <label
                for="company-name"
                class="col-sm-12 col-form-label col-form-label-sm"
              >
                ໝາຍເຫດ: {{store.dataapp[0].remark}}</label
              >
            </div>
          </div>

          <div class="row" v-if="store.dataapp[0].app_status == 'Y'">
            <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12" style="text-align: right;
">
         <button type="button" class="btn btn-primary"  @click="ModalP()">
          ເພິ່ມ ໃບຂັບຂີ່ ໃຫ້ຜູ້ໃຊ້
              </button>
            </div>
          </div>
          <br>
          <div class="row">

            <div class="col-6 col-sm-12 col-md-6">
              <div class="form-group row">
                <img
                  src="../../assets/images/no_photo.jpg"
                  class="img-fluid"
                  width="80"
                  height="80"
                />
              </div>
            </div>
            <div class="col-6 col-sm-12 col-md-6 p-5">
              <div class="form-group row">
                <span style="font-size: 24px;">
                  ເລກທີ: ຂສ  0037730
                </span>
              </div>
              <div class="form-group row">
                
                <span style="font-size: 24px;">
                  ອອກຊື່: ທ້າວ ສົມສັກ ຈ່າງດາບຸດ
                </span>
              </div>
              <div class="form-group row">
                
                <span style="font-size: 24px;">
                  ປະເພດອະນຸຍາດ:  AB
                </span>
              </div>
              <div class="form-group row">
                
                <span style="font-size: 24px;">
                  ອອກວັນທີ: 28/12/2023
                </span>
              </div>
              <div class="form-group row">
                
                <span style="font-size: 24px;">
                  ໝົດອາຍຸ : 27/12/2028
                </span>
              </div>
              <div class="form-group row">
               
                <span style="font-size: 24px;">
                  ອອກທີ່: ກຄພຂ ຈຳປາສັກ
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="store.cancelapp">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
          ຍົກເລີກນັດໝາຍ : {{store.searchapp.ap_number}} ?
        </h1>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ເຫດຜົນທີ່ຍົກເລີກ</label
          >

          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="ຕົວຢ່າງ: ເອກະສານບໍ່ຖືກຕ້ອງ,  ຜູ້ກ່ຽວບໍ່ມາຕາມນັດ, ປະຫວັດການເຂົ້າຮຽນບໍ່ຄົບ, ຜິດລະບຽບ ປັບຕົກ. ..." v-model="store.remark"
          >
          </textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ຍົກເລີກ
        </button>
        <button type="button" class="btn btn-primary" @click="CancelApp()">
          ບັນທຶກ
        </button>
      </div>
    </div>
  </div>

  <div  class="modal" v-if="store.verify">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
          ຢືນຢັນເອກະສານຜ່ານ : {{store.searchapp.ap_number}}
        </h1>
      </div>
    
      <div class="modal-body">
        <div class="form-group row p-3" v-for="veggie in store.veggies">
          <div class="form-group form-check">
    <input  type="checkbox" v-model="veggie.selected">
    <label class="form-check-label" for="exampleCheck1">{{veggie.name}}</label>
  </div>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label"
            >ລຳດັບສອບເສັງ </label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
              maxlength="50"
               v-model="store.formver.division" disabled
            />
          </label>
        </div>


      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ຍົກເລີກ
        </button>
        <button type="button" class="btn btn-primary" @click="UpdateStatus()">
          ຢືນຢັນ
        </button>
      </div>
    </div>
  </div>


  
  <div  class="modal" v-if="store.theoryscore">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
          ບັນທຶກຜົນເສັງ ພາກທິດສະດີ : {{store.searchapp.ap_number}}
        </h1>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຊື່ :</label
          >
    
          <label for="inputEmail3" class="col-sm-4 col-form-label" v-if="store.dataapp.length > 0"
            >{{store.dataapp[0].user_prefrix}} {{store.dataapp[0].user_firstname}} {{store.dataapp[0].user_lastname}}</label
          >
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ປະເພດ :</label
          >
          <label for="inputEmail3" class="col-sm-8 col-form-label"
            > {{ store.dlt_select.dlt_code }}:{{ store.dlt_select.dlt_name_lo }}</label
          >
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຄະແນນ :</label
          >
          <div class="form-group col-md-2">

      <input type="text" class="form-control" id="inputZip"  @input="filterIAscore" v-model="store.formscoreT.score" maxlength="2">
      
    </div>
    
    <label for="inputEmail3" class="col-sm-1"
            >
         
            <span style="font-size: 30px;">/</span>
            </label
          >
          
    <div class="form-group col-md-2">
<input type="text" class="form-control" id="inputZip" disabled v-model="store.totalscore.total_question"
>

</div>

        </div>
        <div class="form-group row" v-if="store.ScoreReqTh == true">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            ></label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: red"
          >
       * ระบุ คะแนน
          </label>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຜົນສະຫຼຸບ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
        <select class="form-control" v-model="store.formscoreT.mr_status" disabled>
        <option value="pass">{{ $t("menu_result_pass") }}</option>
        <option value="fail">{{ $t("menu_result_fall") }}</option>
      </select>
          </label>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ເລກທີອ້າງອິງ ຂອງລະບົບເສັງ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
              maxlength="50"
               v-model="store.formscoreT.ref_number"
            />
          </label>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ໝາຍເຫດ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
              maxlength="200"
                v-model="store.formscoreT.remark"
            />
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ຍົກເລີກ
        </button>
        <button type="button" class="btn btn-primary" @click="UpdateThero()">
          ຢືນຢັນ
        </button>
      </div>
    </div>
  </div>


  
  <div  class="modal" v-if="store.practicalscore">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
          ແກ້ໄຂຜົນເສັງ ພາກປະຕິບັດ : {{store.searchapp.ap_number}}
        </h1>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຊື່ :</label
          >
          <label for="inputEmail3" class="col-sm-4 col-form-label" v-if="store.dataapp.length > 0"
            >{{store.dataapp[0].user_prefrix}} {{store.dataapp[0].user_firstname}} {{store.dataapp[0].user_lastname}}</label
          >
          <label for="inputEmail3" class="col-sm-4 col-form-label" v-else
            >-</label
          >
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ປະເພດ :</label
          >
          <label for="inputEmail3" class="col-sm-8 col-form-label"
            > {{ store.dlt_select.dlt_code }}:{{ store.dlt_select.dlt_name_lo }}</label
          >
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຄະແນນ :</label
          >
          <div class="form-group col-md-2">

            <input type="text" class="form-control" id="inputZip"  @input="filterIAscoreB" v-model="store.formscoreP.score" maxlength="3">
      
    </div>
    <label for="inputEmail3" class="col-sm-1"
            ><span style="font-size: 30px;">/</span></label
          >
    <div class="form-group col-md-2">

<input type="text" class="form-control" id="inputZip" disabled value="100">

</div>
    
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ຜົນສະຫຼຸບ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
        <select class="form-control" v-model="store.formscoreP.mr_status" disabled>
        <option value="pass">{{ $t("menu_result_pass") }}</option>
        <option value="fail">{{ $t("menu_result_fall") }}</option>
      </select>
          </label>
        </div>


        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ເລກທີອ້າງອິງ ຂອງລະບົບເສັງ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
     

                     maxlength="200"
                v-model="store.formscoreP.ref_number"
            />
          </label>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-4 col-form-label"
            >ໝາຍເຫດ :</label
          >
          <label
            for="inputEmail3"
            class="col-sm-8 col-form-label"
            style="color: chartreuse"
          >
            <input
              class="common__login__input form-control"
              type="text"
        
                     maxlength="200"
                v-model="store.formscoreP.remark"
            />
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ຍົກເລີກ
        </button>
        <button type="button" class="btn btn-primary" @click="UpdatePra()">
          ຢືນຢັນ
        </button>
      </div>
    </div>
  </div>
</template>

<style  scoped>
@media (min-width: 1025px) {
}
@media (min-width: 1281px) {
  .your-element {
    border-right: 2px solid rgb(241, 241, 241);
  }
}

textarea::placeholder {
  color: rgb(211, 208, 208) !important;
  opacity: 1;
}
</style>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import "vue-select/dist/vue-select.css";

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from "../../services/api.service";

const { locale, setLocale } = useI18n();

const toast = useToast();
const store = AppointStore();
const user_type = useCookie("user_type"); // useCookie new hook in nuxt 3
const router = useRouter();
const auth = useAuthStore();

function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}

const Hide = async () => {
  store.cancelapp = false;
  store.verify = false;
  store.theoryscore = false;
  store.practicalscore = false;
};

const ModalC = async () => {
  store.cancelapp = true;
  store.ScoreReqTh = false
};


const Modaldiv = async () => {
  store.verify = true;
  store.ScoreReqTh = false

};

const ModalT = async () => {
  store.theoryscore = true;
  store.ScoreReqTh = false
};


const ModalP = async () => {
  store.practicalscore = true;
  store.ScoreReqTh = false
};

const SearchApp = async () => {
await store.fetchAppNumber();
};



const filterIAscore = async (event) => {
 
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");
  const key = event.data;
      if (event.data === ' ') {
        store.formscoreT.score= store.formscoreT.score.substring(0, store.formscoreT.score.length - 1);
        return;
      }
      if (store.formscoreT.score.charAt(0) == '0') {
        store.formscoreT.score = "";
        return;
      } 
    
      store.formscoreT.score = event.target.value.replace(/\D/g, "");


     if(store.formscoreT.score >= store.totalscore.em_measure){
      if(store.formscoreT.score > store.totalscore.total_question){
      store.formscoreT.score = store.totalscore.total_question
   
     }
         store.formscoreT.mr_status = 'pass'
     }

     if(store.formscoreT.score < store.totalscore.em_measure){
       store.formscoreT.mr_status = 'fail'
     }
};

const filterIAscoreB = async (event) => {
 
 // stores.form.user_phone = event.target.value.replace(/\D/g, "");
 const key = event.data;
     if (event.data === ' ') {
       store.formscoreP.score= store.formscoreP.score.substring(0, store.formscoreP.score.length - 1);
       return;
     }
     if (store.formscoreP.score.charAt(0) == '0') {
       store.formscoreP.score = "";
       return;
     } 
   
     store.formscoreP.score = event.target.value.replace(/\D/g, "");


    if(store.formscoreP.score >= 85){
     if(store.formscoreP.score > 100){
     store.formscoreP.score = 100
  
    }
        store.formscoreP.mr_status = 'pass'
    }

    if(store.formscoreP.score < 85){
      store.formscoreP.mr_status = 'fail'
    }
};

const UpdateThero = async () => {

 
 
  if(store.formscoreT.score == ""){
    store.ScoreReqTh = true
return false;
  }
  store.theoryscore = false;
  store.formresult.mr_learn_type = 1;
  store.ScoreReqTh = false
  let save = await store.SaveResultScore();

  await store.fetchResultScore();
}

const UpdatePra= async () => {
  if(store.formscoreP.score == ""){
    store.ScoreReqTh = true
return false;
  }
  store.practicalscore = false;
  store.formresult.mr_learn_type = 2;
 let save = await store.SaveResultScorePra();
 await store.fetchResultScore();
}

const CancelApp = async () => {
  store.cancelapp = false;
  let cancel = await store.CancelAppointment();
}

const UpdateStatus = async () => {
  store.verify = false;
  let ver = await store.UpdateStatusApp();
}




</script>




