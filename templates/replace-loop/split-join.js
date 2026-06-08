const str = "a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += str.split("_").join("-").length;
}

const out = s;
